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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const images_repository_1 = require("./images.repository");
let ImagesService = class ImagesService {
    constructor(imagesRepository) {
        this.imagesRepository = imagesRepository;
    }
    async create(createImageDto) {
        const image = this.imagesRepository.create(createImageDto);
        await this.imagesRepository.save(image);
        throw new common_1.HttpException("success", common_1.HttpStatus.OK);
    }
    findAll() {
        return this.imagesRepository.getImage();
    }
    findOne(id) {
        return this.imagesRepository.getImageById(id);
    }
    async update(id, updateImageDto) {
        await this.imagesRepository.update(id, updateImageDto);
        const updatedImage = await this.imagesRepository.findOne(id);
        if (updatedImage) {
            return updatedImage;
        }
        throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
    }
    remove(id) {
        return this.imagesRepository.deleteImage(id);
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [images_repository_1.ImagesRepository])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map