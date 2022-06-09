"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsModule = void 0;
const common_1 = require("@nestjs/common");
const secrets_service_1 = require("./secrets.service");
const secrets_controller_1 = require("./secrets.controller");
const typeorm_1 = require("@nestjs/typeorm");
const secrets_repository_1 = require("./secrets.repository");
let SecretsModule = class SecretsModule {
};
SecretsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([secrets_repository_1.SecretsRepository]),
        ],
        controllers: [secrets_controller_1.SecretsController],
        providers: [secrets_service_1.SecretsService]
    })
], SecretsModule);
exports.SecretsModule = SecretsModule;
//# sourceMappingURL=secrets.module.js.map