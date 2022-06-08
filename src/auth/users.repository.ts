import { ConflictException, HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto:AuthCredentialsDto): Promise<void> {
    const { name, password } = authCredentialsDto;

    const user = this.create({ name, password });

    try{
      await this.save(user);
      throw new HttpException("success", HttpStatus.OK)
    }catch(error){
      if (error.errno === 1062){
        throw new HttpException("Username already exists", HttpStatus.CONFLICT)
      }else{
        throw new InternalServerErrorException()
      }
    }
  }

  async getByName(name: string) {
    const user = await this.findOne({where: {name: name}});
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, name: string) {
    const user = await this.getByName(name);
 
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );
 
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userName: string) {
    const user = await this.getByName(userName)
    user.currentHashedRefreshToken = null
    return user
  }
}