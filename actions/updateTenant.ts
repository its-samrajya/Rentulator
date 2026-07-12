"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTenantRooms(
  tenantId: string,
  roomIds: string[],
  moveInDate: string,
) {
  try {
    const currentOccupancies = await prisma.occupancy.findMany({
      where: { tenantId, moveOutDate: null },
      select: { id: true, roomId: true },
    });
    const currentRoomIds = currentOccupancies.map((o) => o.roomId);

    const roomsToRemove = currentOccupancies.filter(
      (o) => !roomIds.includes(o.roomId),
    );
    const roomIdsToAdd = roomIds.filter((id) => !currentRoomIds.includes(id));

    if (roomIdsToAdd.length > 0) {
      const newRooms = await prisma.room.findMany({
        where: { id: { in: roomIdsToAdd } },
        select: { id: true, meterId: true },
      });
      const meterIds = [...new Set(newRooms.map((r) => r.meterId))];

      const siblingRooms = await prisma.room.findMany({
        where: { meterId: { in: meterIds } },
        include: {
          occupancies: {
            where: { moveOutDate: null },
            select: { tenantId: true, roomId: true },
          },
        },
      });

      for (const meterId of meterIds) {
        const roomsOnMeter = siblingRooms.filter((r) => r.meterId === meterId);
        const conflict = roomsOnMeter.find((room) =>
          room.occupancies.some(
            (o) => o.tenantId !== tenantId && !roomIds.includes(room.id),
          ),
        );
        if (conflict) {
          return {
            success: false,
            message: `Room ${conflict.roomNumber} shares a meter with a room you're assigning, but belongs to a different tenant. All rooms on a shared meter must move together.`,
          };
        }
      }
    }

    await prisma.$transaction([
      ...roomsToRemove.map((o) =>
        prisma.occupancy.update({
          where: { id: o.id },
          data: { moveOutDate: new Date() },
        }),
      ),
      ...roomIdsToAdd.map((roomId) =>
        prisma.occupancy.create({
          data: {
            tenantId,
            roomId,
            moveInDate: new Date(moveInDate),
          },
        }),
      ),
    ]);

    revalidatePath("/admin/tenants");
    return { success: true, message: "Tenant rooms updated" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update tenant rooms" };
  }
}
