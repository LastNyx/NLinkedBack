import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { AuthLoginDto } from './dto/auth-login.dto'
import { User } from './entities/user.entity'
import { UsersRepository } from './users.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import RequestWithUser from './requestWithUser.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ){}

  async signUp(authCredentialsDto:AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto:AuthCredentialsDto) {
    const { name, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ name })

    if(user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { name };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken }
    }else{
      throw new UnauthorizedException("Please Check Your Login Credentials")
    }
  }

  public async getCurrentUser(req : RequestWithUser){
    const user = req.user;
    user.password = undefined;
    user.currentHashedRefreshToken = undefined;
    return user;
  }

  public async getAuthUser(name: string, password: string) {
    try{
      const user = await this.usersRepository.findOne({ name })
      await this.verifyPassword(password, user.password)
      user.password = undefined;
      return user;
    }catch (err) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatch){
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtAccessToken(name: string) {
    const payload: JwtPayload = { name };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`
  }

  public getCookieWithJwtRefreshToken(name: string) {
    const payload: JwtPayload = { name };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      cookie,
      token
    }
  }

  async setCurrentRefreshToken(refreshToken: string, id: number){
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken,10);
    await this.usersRepository.update(id, {currentHashedRefreshToken})
  }

  public getCookieForLogout(){
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }
}
