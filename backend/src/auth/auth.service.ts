import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {
constructor(private prisma:PrismaService, private jwt: JwtService) {}
async register(email: string, password: string, username?: string) {
  const exists = await this.prisma.user.findUnique({ where: { email } });
  if (exists) throw new BadRequestException('Email already in use');

  const hash = await bcrypt.hash(password, 12);
  const user = await this.prisma.user.create({ data: { email, password: hash, username } });

  return { id: user.id, email: user.email, username: user.username }; 
}



async login(email:string, password:string){
    const user = await this.prisma.user.findUnique({where: {email}})
    if (!user) throw new UnauthorizedException('Invalid Credentials')
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) throw new UnauthorizedException('Invalid Credentials')
    return this.sign(user.id, user.email)
}
    private async sign(sub: string, email: string) {
        const token = await this.jwt.signAsync({ sub, email }, {
          expiresIn: process.env.JWT_EXPIRES_IN || '7d',
          secret: process.env.JWT_SECRET!,
        });
        return { access_token: token };
      }

}

