import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class UsersRepository extends Repository<User> {
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    getByName(name: string): Promise<User>;
    getUserIfRefreshTokenMatches(refreshToken: string, name: string): Promise<User>;
    removeRefreshToken(userName: string): Promise<User>;
}
