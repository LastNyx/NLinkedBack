"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const secret_entity_1 = require("./entities/secret.entity");
let SecretsRepository = class SecretsRepository extends typeorm_1.Repository {
    async getLinks() {
        const links = await this.find({
            order: {
                id: 'ASC'
            },
        });
        return {
            data: links,
        };
    }
    async getLinkById(id) {
        const link = await this.findOne(id);
        if (link) {
            return link;
        }
        throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteLink(id) {
        const deleteLink = await this.delete(id);
        if (!deleteLink.affected) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('Success', common_1.HttpStatus.OK);
    }
};
SecretsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(secret_entity_1.Secret)
], SecretsRepository);
exports.SecretsRepository = SecretsRepository;
//# sourceMappingURL=secrets.repository.js.map