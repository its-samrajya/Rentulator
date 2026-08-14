"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const removeMeter = async (meterId: string) => {
  try {
    const roomUsingMeter = await prisma.room.findMany({
      where: { meterId },
      select: { roomNumber: true },
    });
    if (roomUsingMeter.length > 0) {
      const roomList = roomUsingMeter.map((room) => room.roomNumber).join(", ");
      return {
        success: false,
        message: `Can't delete this meter — it's still assigned to room(s) ${roomList}. Reassign those rooms to a different meter first.`,
      };
    }
    await prisma.electricMeter.delete({ where: { id: meterId } });
    revalidatePath("/admin/meters");
    return {
      success: true,
      message: "Meter deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete meter",
    };
  }
};

export default removeMeter;
