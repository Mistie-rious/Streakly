import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';

import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Frequency } from './types';

@Injectable()
export class HabitsService {
    constructor(private prisma: PrismaService) {}

    async list(userId: string, limit = 10, offset = 0, frequency?: Frequency) {
      const todayISO = new Date().toISOString().split('T')[0];
      const start = new Date(todayISO);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    
      const habits = await this.prisma.habit.findMany({
        where: {
          userId,
          ...(frequency && { frequency }),
        },
        include: {
         
          tracks: {
            orderBy: { date: 'desc' },
            take: 7,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      });
    
      return habits.map(habit => ({
        ...habit,
        completedToday: habit.tracks.some(
          t => t.date >= start && t.date < end
        ),
      }));
    }
    
      
      create(userId: string, dto: CreateHabitDto) {
        return this.prisma.habit.create({
          data: { ...dto, userId },
          include: {
            tracks: true,      
           
          },
        });
      }
      

      async get(userId: string, habitId: string, limit = 10, offset = 0) {
        const todayISO = new Date().toISOString().split("T")[0];
        const start = new Date(todayISO);
        const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      
        // Fetch habit without user filter
        const habit = await this.prisma.habit.findFirst({
          where: { id: habitId },
          include: {
           
            tracks: { take: limit, skip: offset, orderBy: { date: "desc" } },
          },
        });
      
        if (!habit) {
          throw new NotFoundException(`Habit with id ${habitId} not found`);
        }
      
        // Check if habit belongs to the user
        if (habit.userId !== userId) {
          throw new ForbiddenException(`Habit with id ${habitId} does not belong to this user`);
        }
      
        const completedToday = habit.tracks.some(
          (t) => t.date >= start && t.date < end
        );
      
        const history = habit.tracks.map((t) => ({
          date: t.date,
          completed: true,
        }));
      
        return { ...habit, completedToday, history };
      }
      
      
      

    async update(userId: string, id:string, dto: UpdateHabitDto){
        await this.get(userId, id);
        return this.prisma.habit.update({ where: { id }, data: dto }) 
   

    }
    async remove (userId: string, id: string) {
        await this.get(userId, id);
        await this.prisma.habitTrack.deleteMany({where: {habitId: id}});
        return this.prisma.habit.delete({where: {id}});
    }
    

}
