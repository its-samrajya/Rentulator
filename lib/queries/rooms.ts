import prisma from "../prisma";

export const getAllRoomsCount = async () => {
  return await prisma.room.count();
};

export const getAllRooms = async () => {
  return await prisma.room.findMany({
    include: {
      electricMeter: true,
      occupancies: true,
    },
    orderBy: {
      roomNumber: "asc",
    },
  });
};
