import prisma from "@/lib/prisma";

async function main() {
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
    { meterNumber: "MTR-010" },
  ];

  await prisma.electricMeter.createMany({
    data: meterData,
    skipDuplicates: true, // won't error if meterNumber already exists
  });

  const meters = await prisma.electricMeter.findMany();

  // 2. Array of rooms — each references a meter by index
  const roomData = [
    {
      roomNumber: 101,
      floor: "Ground",
      price: 30000,
      description: "Naseem",
      meterNumber: "MTR-001",
    },
    {
      roomNumber: 102,
      floor: "Ground",
      price: 25000,
      description: "Tent",
      meterNumber: "MTR-002",
    },
    {
      roomNumber: 103,
      floor: "Ground",
      price: 2500,
      description: "Naseem room 1",
      meterNumber: "MTR-001",
    },
    {
      roomNumber: 104,
      floor: "Ground",
      price: 2500,
      description: "Naseem room 2",
      meterNumber: "MTR-001",
    },
    {
      roomNumber: 201,
      floor: "2nd",
      price: 10000,
      description: "Aakurai",
      meterNumber: "MTR-003",
    },
    {
      roomNumber: 202,
      floor: "2nd",
      price: 6000,
      description: "Aakurai",
      meterNumber: "MTR-003",
    },
    {
      roomNumber: 203,
      floor: "2nd",
      price: 3000,
      description: "Aakurai small room",
      meterNumber: "MTR-003",
    },
    {
      roomNumber: 204,
      floor: "2nd",
      price: 3500,
      description: "Aakurai addharo classroom room",
      meterNumber: "MTR-004",
    },
    {
      roomNumber: 205,
      floor: "2nd",
      price: 5000,
      description: "Aakurai near toilet",
      meterNumber: "MTR-004",
    },
    {
      roomNumber: 206,
      floor: "2nd",
      price: 6000,
      description: "Sahakari",
      meterNumber: "MTR-005",
    },
    {
      roomNumber: 207,
      floor: "2nd",
      price: 6000,
      description: "Last empty room",
      meterNumber: "MTR-006",
    },
    {
      roomNumber: 301,
      floor: "3rd",
      price: 10000,
      description: "Dai",
      meterNumber: "MTR-007",
    },
    {
      roomNumber: 302,
      floor: "3rd",
      price: 6000,
      description: "Germany",
      meterNumber: "MTR-008",
    },
    {
      roomNumber: 303,
      floor: "3rd",
      price: 3000,
      description: "Germany small room",
      meterNumber: "MTR-008",
    },
    {
      roomNumber: 304,
      floor: "3rd",
      price: 3000,
      description: "Germany Aadharo room",
      meterNumber: "MTR-009",
    },
    {
      roomNumber: 305,
      floor: "3rd",
      price: 5000,
      description: "Toilet near room",
      meterNumber: "MTR-009",
    },
    {
      roomNumber: 306,
      floor: "3rd",
      price: 6000,
      description: "Ramtel",
      meterNumber: "MTR-010",
    },
    {
      roomNumber: 307,
      floor: "3rd",
      price: 6000,
      description: "last germany room ",
      meterNumber: "MTR-009",
    },
  ];

  const meterMap = new Map(
    meters.map((meter) => [meter.meterNumber, meter.id]),
  );
  const now = new Date();

  await Promise.all(
    roomData.map((room, i) =>
      prisma.room.create({
        data: {
          roomNumber: room.roomNumber,
          floor: room.floor,
          price: room.price,
          description: room.description,
          meterId: meterMap.get(room.meterNumber)!,
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
