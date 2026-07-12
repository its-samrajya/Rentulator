import prisma from "../prisma";

export const getAllRoomsWithOccupancy = async () => {
  return await prisma.room.findMany({
    include: {
      occupancies: {
        where: {
          moveOutDate: null,
        },
        select: { tenantId: true },
      },
    },
  });
};
