import { Controller, Body, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateTrackDto } from './dto/create-track.dto';
import { QueryTracksDto } from './dto/query-tracks.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('tracks')
@ApiBearerAuth('access-token') 
@UseGuards(JwtAuthGuard)
@Controller('habits/:habitId/tracks')
export class TracksController {
    constructor(private service: TracksService) {}

    @Post()
    add(@GetUser() user:any, @Param('habitId') habitId: string, @Body() dto: CreateTrackDto){
        return this.service.add(user.sub, habitId, dto.date);
    }


  @Post('toggle-today')
  toggleToday(@GetUser() user: any, @Param('habitId') habitId: string) {
    return this.service.toggleToday(user.sub, habitId);
  }

    @Get(':habitId/tracks')
    list(
      @GetUser() user: any,
      @Param('habitId') habitId: string,
      @Query() query: QueryTracksDto,  
    ) {
      return this.service.list(
        user.sub,
        habitId,
        query.start,
        query.end,
        query.limit,
        query.offset
      );
    }


    @Delete(':trackId')
    remove(@GetUser() user:any, @Param('habitId') habitId:string, @Param('trackId') trackId: string){
        return this.service.remove(user.sub, habitId, trackId)
    }

}

