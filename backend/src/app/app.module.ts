import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { HabitsController } from '../habits/habits.controller';
import { HabitsService } from '../habits/habits.service';
import { HabitsModule } from '../habits/habits.module';
import { TracksModule } from '../tracks/tracks.module';


@Module({
  imports: [UserModule, PrismaModule, AuthModule, HabitsModule, TracksModule],
})
export class AppModule {}
