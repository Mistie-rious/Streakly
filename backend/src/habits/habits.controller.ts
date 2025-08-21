import { Controller, Body, Delete, Get, Param, Patch, Post, UseGuards, Req, Query } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { PaginationDto } from './dto/get-habit.dto';
@ApiTags('habits')
@ApiBearerAuth('access-token') 
@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
    constructor(private service: HabitsService) {}


    @Get()
list(@GetUser('sub') userId: string, @Query() query: PaginationDto  = {} ) {
  return this.service.list(
    userId,                 
    query.limit ?? 10,
    query.offset ?? 0,
    query.frequency
  );
}


    
    

    @ApiBody({ type: CreateHabitDto })
    @Post()
    create(@GetUser() user:any, @Body() dto:CreateHabitDto){
        return this.service.create(user.sub, dto);
    }

    @Get(':id')
    get(
      @GetUser() user: any, 
      @Param('id') id: string, 
      @Query() query: PaginationDto = {}
    ) {
      return this.service.get(
        user.sub,         
        id,               
        query.limit ?? 10, 
        query.offset ?? 0  
      );
    }
    
    
    @Patch(':id')
    update(@GetUser() user: any, @Param('id') id:string, @Body() dto:UpdateHabitDto) {
        return this.service.update(user.sub, id, dto);
    }

    @Delete(':id')
    remove(@GetUser() user: any, @Param('id') id:string){
        return this.service.remove(user.sub, id)
    }
}
