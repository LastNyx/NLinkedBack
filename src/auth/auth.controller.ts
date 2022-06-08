import { Controller, Get, Post, Body, UseGuards, HttpCode, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard  } from './localAuth.guard';
import JwtRefreshGuard from './jwt-refresh.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  @Post('/signup')
  async signup(@Body() authCredentialsDto: AuthCredentialsDto){
    return this.authService.signUp(authCredentialsDto)
  }

  /*@Post('/signin')
  async signin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}>{
    return this.authService.signIn(authCredentialsDto)
  }*/

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req:RequestWithUser) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtAccessToken(user.name);
    const {
      cookie: refreshTokenCookie,
      token: refreshToken
    } = this.authService.getCookieWithJwtRefreshToken(user.name);
    
    await this.authService.setCurrentRefreshToken(refreshToken,user.id)
    
    req.res.setHeader('Set-Cookie', [cookie, refreshTokenCookie])
    user.password = undefined;
    user.currentHashedRefreshToken = undefined;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @HttpCode(200)
  async logOut(@Req() req: RequestWithUser){
    await this.usersRepository.removeRefreshToken(req.user.name)
    req.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    throw new HttpException('Logged Out', HttpStatus.OK)
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.name);
 
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  auth(@Req() req: RequestWithUser){
    return this.authService.getCurrentUser(req);
  }
}
