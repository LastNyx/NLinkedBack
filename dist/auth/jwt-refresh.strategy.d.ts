import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly configService;
    private usersRepository;
    constructor(configService: ConfigService, usersRepository: UsersRepository);
    validate(request: Request, payload: JwtPayload): Promise<import("./entities/user.entity").User>;
}
export {};
