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
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const links_repository_1 = require("./links.repository");
let LinksService = class LinksService {
    constructor(linksRepository) {
        this.linksRepository = linksRepository;
    }
    async create(createLinkDto) {
        const link = this.linksRepository.create(createLinkDto);
        await this.linksRepository.save(link);
        throw new common_1.HttpException("success", common_1.HttpStatus.OK);
    }
    findAll() {
        return this.linksRepository.getLinks();
    }
    findOne(id) {
        return this.linksRepository.getLinkById(id);
    }
    findByType(type) {
        return this.linksRepository.getLinkByType(type);
    }
    async update(id, updateLinkDto) {
        await this.linksRepository.update(id, updateLinkDto);
        const updatedLink = await this.linksRepository.findOne(id);
        if (updatedLink) {
            return updatedLink;
        }
        throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
    }
    remove(id) {
        return this.linksRepository.deleteLink(id);
    }
};
LinksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(links_repository_1.LinksRepository)),
    __metadata("design:paramtypes", [links_repository_1.LinksRepository])
], LinksService);
exports.LinksService = LinksService;
//# sourceMappingURL=links.service.js.map