// prisma/seed.ts

import prisma from "@/lib/prisma";

async function main() {
  // 1. Array of meters to create
  const meterData = [
    { meterNumber: "MTR-001" },
    { meterNumber: "MTR-002" },
    { meterNumber: "MTR-003" },
    { meterNumber: "MTR-004" },
    { meterNumber: "MTR-005" },
    { meterNumber: "MTR-006" },
    { meterNumber: "MTR-007" },
    { meterNumber: "MTR-008" },
    { meterNumber: "MTR-009" },
  ];

  // createMany is fastest when there are NO relations to connect
  await prisma.electricMeter.createMany({
    data: meterData,
    skipDuplicates: true, // won't error if meterNumber already exists
  });

  // fetch them back so we have their generated IDs
  const meters = await prisma.electricMeter.findMany();

  // 2. Array of rooms — each references a meter by index
  const roomData = [
    {
      roomNumber: 101,
      floor: "1st",
      price: 8000,
      description: "Single room with balcony",
    },
    {
      roomNumber: 102,
      floor: "1st",
      price: 8500,
      description: "Corner room, more sunlight",
    },
    {
      roomNumber: 201,
      floor: "2nd",
      price: 9000,
      description: "Two-room unit",
    },
    {
      roomNumber: 103,
      floor: "1st",
      price: 8000,
      description: "Single room with balcony",
    },
    {
      roomNumber: 104,
      floor: "1st",
      price: 8500,
      description: "Corner room, more sunlight",
    },
    {
      roomNumber: 202,
      floor: "2nd",
      price: 9000,
      description: "Two-room unit",
    },
    {
      roomNumber: 105,
      floor: "1st",
      price: 8000,
      description: "Single room with balcony",
    },
    {
      roomNumber: 106,
      floor: "1st",
      price: 8500,
      description: "Corner room, more sunlight",
    },
    {
      roomNumber: 203,
      floor: "2nd",
      price: 9000,
      description: "Two-room unit",
    },
  ];

  const now = new Date();

  await Promise.all(
    roomData.map((room, i) =>
      prisma.room.create({
        data: {
          ...room,
          meterId: meters[i % meters.length].id, // cycle through meters
          createdAt: now,
          updatedAt: now,
        },
      }),
    ),
  );

  console.log(
    `Seeded ${meterData.length} meters and ${roomData.length} rooms ✅`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
