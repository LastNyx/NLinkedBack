"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    async createUser(authCredentialsDto) {
        const { name, password } = authCredentialsDto;
        const user = this.create({ name, password });
        try {
            await this.save(user);
            throw new common_1.HttpException("success", common_1.HttpStatus.OK);
        }
        catch (error) {
            if (error.errno === 1062) {
                throw new common_1.HttpException("Username already exists", common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async getByName(name) {
        const user = await this.findOne({ where: { name: name } });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async getUserIfRefreshTokenMatches(refreshToken, name) {
        const user = await this.getByName(name);
        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }
    }
    async removeRefreshToken(userName) {
        const user = await this.getByName(userName);
        user.currentHashedRefreshToken = null;
        return user;
    }
};
UsersRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map