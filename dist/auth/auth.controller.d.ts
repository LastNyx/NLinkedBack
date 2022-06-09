import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import RequestWithUser from './requestWithUser.interface';
import { UsersRepository } from './users.repository';
export declare class AuthController {
    private readonly authService;
    private usersRepository;
    constructor(authService: AuthService, usersRepository: UsersRepository);
    signup(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    login(req: RequestWithUser): Promise<import("./entities/user.entity").User>;
    logOut(req: RequestWithUser): Promise<void>;
    refresh(request: RequestWithUser): import("./entities/user.entity").User;
    auth(req: RequestWithUser): Promise<import("./entities/user.entity").User>;
}
