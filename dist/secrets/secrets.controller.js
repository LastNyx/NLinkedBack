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
exports.SecretsController = void 0;
const common_1 = require("@nestjs/common");
const secrets_service_1 = require("./secrets.service");
const create_secret_dto_1 = require("./dto/create-secret.dto");
const update_secret_dto_1 = require("./dto/update-secret.dto");
const roles_decorator_1 = require("../roles/roles.decorator");
const role_enum_1 = require("../roles/enum/role.enum");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../roles/roles.guard");
let SecretsController = class SecretsController {
    constructor(linksService) {
        this.linksService = linksService;
    }
    create(createLinkDto) {
        return this.linksService.create(createLinkDto);
    }
    findAll() {
        return this.linksService.findAll();
    }
    findOne(id) {
        return this.linksService.findOne(+id);
    }
    update(id, updateLinkDto) {
        return this.linksService.update(+id, updateLinkDto);
    }
    remove(id) {
        return this.linksService.remove(+id);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR, role_enum_1.default.PREMIUM_USER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_secret_dto_1.CreateSecretDto]),
    __metadata("design:returntype", void 0)
], SecretsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR, role_enum_1.default.PREMIUM_USER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SecretsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR, role_enum_1.default.PREMIUM_USER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SecretsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR, role_enum_1.default.PREMIUM_USER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_secret_dto_1.UpdateSecretDto]),
    __metadata("design:returntype", void 0)
], SecretsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR, role_enum_1.default.PREMIUM_USER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SecretsController.prototype, "remove", null);
SecretsController = __decorate([
    (0, common_1.Controller)('secrets'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [secrets_service_1.SecretsService])
], SecretsController);
exports.SecretsController = SecretsController;
//# sourceMappingURL=secrets.controller.js.map