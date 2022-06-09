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
exports.SecretsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const secrets_repository_1 = require("./secrets.repository");
let SecretsService = class SecretsService {
    constructor(secretsRepository) {
        this.secretsRepository = secretsRepository;
    }
    async create(createSecretDto) {
        const link = this.secretsRepository.create(createSecretDto);
        await this.secretsRepository.save(link);
        throw new common_1.HttpException("success", common_1.HttpStatus.OK);
    }
    findAll() {
        return this.secretsRepository.getLinks();
    }
    findOne(id) {
        return this.secretsRepository.getLinkById(id);
    }
    async update(id, updateSecretDto) {
        await this.secretsRepository.update(id, updateSecretDto);
        const updatedLink = await this.secretsRepository.findOne(id);
        if (updatedLink) {
            return updatedLink;
        }
        throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
    }
    remove(id) {
        return this.secretsRepository.deleteLink(id);
    }
};
SecretsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(secrets_repository_1.SecretsRepository)),
    __metadata("design:paramtypes", [secrets_repository_1.SecretsRepository])
], SecretsService);
exports.SecretsService = SecretsService;
//# sourceMappingURL=secrets.service.js.map