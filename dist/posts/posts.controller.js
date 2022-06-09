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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const tags_service_1 = require("../tags/tags.service");
const roles_guard_1 = require("../roles/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
const role_enum_1 = require("../roles/enum/role.enum");
const posts_repository_1 = require("./posts.repository");
const typeorm_1 = require("@nestjs/typeorm");
let PostsController = class PostsController {
    constructor(postsService, tagsService, postRepository) {
        this.postsService = postsService;
        this.tagsService = tagsService;
        this.postRepository = postRepository;
    }
    async create(createPostDto, req) {
        const tags = await this.tagsService.findByNames(createPostDto.tags);
        return this.postsService.create(createPostDto, tags, req.user);
    }
    getTest({ page, search, tag }) {
        return this.postsService.test(page, search, tag);
    }
    findAllPublic({ page, search }) {
        return this.postsService.findAllPublic(page, search);
    }
    findAll({ page, search }, req) {
        return this.postsService.findAll(page, search, req.user);
    }
    async findRand() {
        const posts = await this.postRepository.createQueryBuilder("posts")
            .leftJoinAndSelect("posts.images", "images")
            .orderBy("RAND()")
            .limit(5)
            .getMany();
        return posts;
    }
    findOnePublic(id) {
        return this.postsService.findOnePub(+id);
    }
    findOne(id, req) {
        return this.postsService.findOne(+id, req.user);
    }
    async update(id, updatePostDto, req) {
        const tags = await this.tagsService.findByNames(updatePostDto.tags);
        return this.postsService.update(+id, updatePostDto, tags, req.user);
    }
    remove(id) {
        return this.postsService.remove(+id);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/test"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getTest", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAllPublic", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR, role_enum_1.default.PREMIUM_USER, role_enum_1.default.USER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Get)('loggedin'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findRand", null);
__decorate([
    (0, common_1.Get)(':id/public'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findOnePublic", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR, role_enum_1.default.PREMIUM_USER, role_enum_1.default.USER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.default.ADMIN, role_enum_1.default.CONTRIBUTOR),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "remove", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(2, (0, typeorm_1.InjectRepository)(posts_repository_1.PostsRepository)),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        tags_service_1.TagsService,
        posts_repository_1.PostsRepository])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map