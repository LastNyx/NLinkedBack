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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tags_repository_1 = require("./tags.repository");
let TagsService = class TagsService {
    constructor(tagsRepository) {
        this.tagsRepository = tagsRepository;
    }
    async create(createTagDto) {
        const tag = await this.tagsRepository.create(createTagDto);
        await this.tagsRepository.save(tag);
        throw new common_1.HttpException("success", common_1.HttpStatus.OK);
    }
    findAll(search) {
        return this.tagsRepository.getTags({ search });
    }
    findOne(page, id) {
        return this.tagsRepository.getTagsById({ page }, id);
    }
    async findByNames(tagsName) {
        const tags = await this.tagsRepository.forEach(tagsName);
        return tags;
    }
    async update(id, updateTagDto) {
        await this.tagsRepository.update(id, updateTagDto);
        const updatedTag = await this.tagsRepository.findOne(id);
        if (updatedTag) {
            return updatedTag;
        }
        throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
    }
    remove(id) {
        return this.tagsRepository.deleteTag(id);
    }
};
TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tags_repository_1.TagsRepository)),
    __metadata("design:paramtypes", [tags_repository_1.TagsRepository])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map