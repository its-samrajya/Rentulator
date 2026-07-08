import prisma from "../prisma";

export const getAllMeters = async () => {
  const meters = await prisma.electricMeter.findMany({
    include: {
      rooms: {
        include: {
          occupancies: {
            where: { moveOutDate: null },
            include: { tenant: true },
          },
        },
      },
    },
  });
  return meters;
};
