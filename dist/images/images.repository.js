"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const image_entity_1 = require("./entities/image.entity");
let ImagesRepository = class ImagesRepository extends typeorm_1.Repository {
    async getImage() {
        const images = await this.find({
            order: {
                id: "ASC"
            }
        });
        return {
            data: images
        };
    }
    async getImageById(id) {
        const image = await this.findOne(id);
        if (image) {
            return image;
        }
        throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteImage(id) {
        const deleteImage = await this.delete(id);
        if (!deleteImage.affected) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('Success', common_1.HttpStatus.OK);
    }
};
ImagesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(image_entity_1.Image)
], ImagesRepository);
exports.ImagesRepository = ImagesRepository;
//# sourceMappingURL=images.repository.js.map