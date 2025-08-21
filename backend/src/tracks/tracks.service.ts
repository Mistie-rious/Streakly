import { Injectable, NotFoundException, ForbiddenException, ConflictException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TracksService {
    constructor(private prisma: PrismaService) {}

    async add(userId: string, habitId: string,dateISO: string ) {
        const habit = await this.prisma.habit.findUnique({where: {id: habitId}});
        if (!habit) throw new NotFoundException('Habit not found!');
        if (habit.userId != userId) throw new ForbiddenException();

        const date = new Date(dateISO);
        try{
            return await this.prisma.habitTrack.create({data: {habitId, date}});
        } catch(e: any){
            if (e.code === 'P2002') throw new ConflictException('Track always exists for this date');
            throw e;
        }
    }

    async list(
        userId: string, 
        habitId: string, 
        start?: string, 
        end?: string, 
        limit = 10, 
        offset = 0
      ) {
        const habit = await this.prisma.habit.findUnique({ where: { id: habitId } });
        if (!habit) throw new NotFoundException('Habit not found');
        if (habit.userId !== userId) throw new ForbiddenException();
      
        return this.prisma.habitTrack.findMany({
          where: {
            habitId,
            ...(start || end
              ? { date: { gte: start ? new Date(start) : undefined, lte: end ? new Date(end) : undefined } }
              : {}),
          },
          take: limit,
          skip: offset,
          orderBy: { date: 'desc' },
        });
      }
      

    async remove(userId: string, habitId: string, trackId: string){
        const track = await this.prisma.habitTrack.findUnique({where: {id: trackId}});
        if (!track) throw new NotFoundException('Track not found');
        const habit = await this.prisma.habit.findUnique({where : {id: track.habitId}});
        if (!habit || habit.userId !== userId || habit.id !== habitId) throw new ForbiddenException();
        return this.prisma.habitTrack.delete({where: {id: trackId}});
    }

    async toggleToday(userId: string, habitId: string) {
      const habit = await this.prisma.habit.findUnique({ where: { id: habitId } });
      if (!habit) throw new NotFoundException('Habit not found');
      if (habit.userId !== userId) throw new ForbiddenException();
  
      const todayISO = new Date().toISOString().split('T')[0]; 
  
     
      const todayTrack = await this.prisma.habitTrack.findFirst({
        where: {
          habitId,
          date: { gte: new Date(todayISO), lt: new Date(new Date(todayISO).getTime() + 24 * 60 * 60 * 1000) }
        }
      });
  
      if (todayTrack) {
        
        await this.prisma.habitTrack.delete({ where: { id: todayTrack.id } });
        return { completedToday: false };
      } else {
    
        const newTrack = await this.prisma.habitTrack.create({ data: { habitId, date: new Date(todayISO) } });
        return { completedToday: true, track: newTrack };
      }
    }
}
