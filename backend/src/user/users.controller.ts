import { Controller, Get, Patch, Body, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('access-token') 
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

constructor(private service: UsersService) {}

@Get('me')
me(@GetUser() user:any) {return this.service.me(user.sub)}

@Patch('me')
update(@GetUser() user:any, @Body() dto: UpdateUserDto){
    return this.service.update(user.sub, dto)
}
}
