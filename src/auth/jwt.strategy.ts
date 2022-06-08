import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from 'passport-jwt'
import 'dotenv/config'
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository'
import { User } from './entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ){
    /*super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });*/
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { name } = payload;
    const user : User = await this.usersRepository.findOne({ name });

    if ( !user ) {
      throw new UnauthorizedException();
    }

    return user;
  }
}