"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateRoomDetails = async (
  roomId: string,
  price: number,
  meterId: string,
) => {
  try {
    await prisma.room.update({
      where: { id: roomId },
      data: { price, meterId },
    });
    revalidatePath("/admin/rooms");
    return { success: true, message: "Room updated" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update room" };
  }
};
