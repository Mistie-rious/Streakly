import { PrismaClient } from '@prisma/client';

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create a user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      password: hashedPassword,
      username: "Test User",
    },
  });


  const habit1 = await prisma.habit.create({
    data: {
      name: "Drink Water",
      description: "Drink 8 glasses of water daily",
      frequency: "DAILY",
  
      userId: user.id,
    },
  });

  const habit2 = await prisma.habit.create({
    data: {
      name: "Exercise",
      description: "Workout for 30 mins",
      frequency: "DAILY",

      userId: user.id,
    },
  });


  await prisma.habitTrack.createMany({
    data: [
      { habitId: habit1.id, date: new Date("2025-08-15") },
      { habitId: habit1.id, date: new Date("2025-08-16") },
      { habitId: habit2.id, date: new Date("2025-08-16") },
    ],
  });



  console.log("Database seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
