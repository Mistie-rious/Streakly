// prisma/seed.ts
import { PrismaClient } from '../generated/prisma'

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
      name: "Test User",
    },
  });


  const habit1 = await prisma.habit.create({
    data: {
      name: "Drink Water",
      description: "Drink 8 glasses of water daily",
      frequency: "DAILY",
      goal: 8,
      userId: user.id,
    },
  });

  const habit2 = await prisma.habit.create({
    data: {
      name: "Exercise",
      description: "Workout for 30 mins",
      frequency: "DAILY",
      goal: 1,
      userId: user.id,
    },
  });

  // Add tracking data
  await prisma.habitTrack.createMany({
    data: [
      { habitId: habit1.id, date: new Date("2025-08-15") },
      { habitId: habit1.id, date: new Date("2025-08-16") },
      { habitId: habit2.id, date: new Date("2025-08-16") },
    ],
  });

  // Add reminders
  await prisma.reminder.create({
    data: { habitId: habit1.id, time: "08:00" },
  });

  await prisma.reminder.create({
    data: { habitId: habit2.id, time: "18:00" },
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
