import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types/jwt-payload.type';


@Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy){
        constructor(){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET!
            });
        }


        async validate(payload: { sub: string; email: string }) {
            return { sub: payload.sub, email: payload.email };
          }
    }

