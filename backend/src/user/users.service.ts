import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from "./dto/update-user.dto";




@Injectable()
export class UsersService{
    constructor(private prisma: PrismaService) {}

   async me(id:string) {
        const user = await this.prisma.user.findUnique({where: {id}, select: { id: true, email: true, username: true }
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id:string, dto:UpdateUserDto){
        const exists = await this.prisma.user.findUnique({where: {id}});
        if (!exists) throw new NotFoundException('User not found');
        return this.prisma.user.update({where:{id}, data: dto, select: { id: true, email: true, username: true }
        });
    }
}