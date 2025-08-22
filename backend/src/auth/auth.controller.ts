import { Controller, Body, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterSwagger, LoginSwagger,  } from "../lib/docs/auth-decorator";
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('register')
    @RegisterSwagger()
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto.email, dto.password, dto.username);
  }

  @Post('login')
  @LoginSwagger()
  login(@Body() dto: LoginDto) {
    return this.service.login(dto.email, dto.password);
  }
}
