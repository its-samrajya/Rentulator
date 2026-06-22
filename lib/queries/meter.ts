import prisma from "../prisma";

export const getAllMeters = async () => {
  const meters = await prisma.electricMeter.findMany({
    include: {
      tenant: true,
    },
  });
  return meters;
};
