import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConfigService } from '@nestjs/config';
import RequestWithUser from './requestWithUser.interface';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    private configService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService, configService: ConfigService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    getCurrentUser(req: RequestWithUser): Promise<import("./entities/user.entity").User>;
    getAuthUser(name: string, password: string): Promise<import("./entities/user.entity").User>;
    private verifyPassword;
    getCookieWithJwtAccessToken(name: string): string;
    getCookieWithJwtRefreshToken(name: string): {
        cookie: string;
        token: string;
    };
    setCurrentRefreshToken(refreshToken: string, id: number): Promise<void>;
    getCookieForLogout(): string[];
}
