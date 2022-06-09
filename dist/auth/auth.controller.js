"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const auth_credentials_dto_1 = require("./dto/auth-credentials.dto");
const localAuth_guard_1 = require("./localAuth.guard");
const jwt_refresh_guard_1 = require("./jwt-refresh.guard");
const typeorm_1 = require("@nestjs/typeorm");
const users_repository_1 = require("./users.repository");
let AuthController = class AuthController {
    constructor(authService, usersRepository) {
        this.authService = authService;
        this.usersRepository = usersRepository;
    }
    async signup(authCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }
    async login(req) {
        const { user } = req;
        const cookie = this.authService.getCookieWithJwtAccessToken(user.name);
        const { cookie: refreshTokenCookie, token: refreshToken } = this.authService.getCookieWithJwtRefreshToken(user.name);
        await this.authService.setCurrentRefreshToken(refreshToken, user.id);
        req.res.setHeader('Set-Cookie', [cookie, refreshTokenCookie]);
        user.password = undefined;
        user.currentHashedRefreshToken = undefined;
        return user;
    }
    async logOut(req) {
        await this.usersRepository.removeRefreshToken(req.user.name);
        req.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
        throw new common_1.HttpException('Logged Out', common_1.HttpStatus.OK);
    }
    refresh(request) {
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.name);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return request.user;
    }
    auth(req) {
        return this.authService.getCurrentUser(req);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(localAuth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.default),
    (0, common_1.Get)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "auth", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, typeorm_1.InjectRepository)(users_repository_1.UsersRepository)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_repository_1.UsersRepository])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map