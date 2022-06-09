"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const tags_service_1 = require("../tags/tags.service");
const posts_controller_1 = require("./posts.controller");
const typeorm_1 = require("@nestjs/typeorm");
const posts_repository_1 = require("./posts.repository");
const images_repository_1 = require("../images/images.repository");
const links_repository_1 = require("../links/links.repository");
const tags_repository_1 = require("../tags/tags.repository");
const secrets_repository_1 = require("../secrets/secrets.repository");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([posts_repository_1.PostsRepository]),
            typeorm_1.TypeOrmModule.forFeature([images_repository_1.ImagesRepository]),
            typeorm_1.TypeOrmModule.forFeature([links_repository_1.LinksRepository]),
            typeorm_1.TypeOrmModule.forFeature([tags_repository_1.TagsRepository]),
            typeorm_1.TypeOrmModule.forFeature([secrets_repository_1.SecretsRepository]),
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService, tags_service_1.TagsService]
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map