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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const image_entity_1 = require("../images/entities/image.entity");
const posts_repository_1 = require("./posts.repository");
const images_repository_1 = require("../images/images.repository");
const links_repository_1 = require("../links/links.repository");
const link_entity_1 = require("../links/entities/link.entity");
const secrets_repository_1 = require("../secrets/secrets.repository");
const secret_entity_1 = require("../secrets/entities/secret.entity");
let PostsService = class PostsService {
    constructor(postRepository, imageRepository, linksRepository, secretsRepository) {
        this.postRepository = postRepository;
        this.imageRepository = imageRepository;
        this.linksRepository = linksRepository;
        this.secretsRepository = secretsRepository;
    }
    async create(createPostDto, tags, user) {
        var e_1, _a, e_2, _b, e_3, _c;
        const post = new post_entity_1.Post();
        post.title = createPostDto.title;
        const imgObj = JSON.parse(JSON.stringify(createPostDto.images));
        const linkObj = JSON.parse(JSON.stringify(createPostDto.links));
        const secretObj = JSON.parse(JSON.stringify(createPostDto.secrets));
        const links = [];
        const secrets = [];
        const images = [];
        try {
            for (var imgObj_1 = __asyncValues(imgObj), imgObj_1_1; imgObj_1_1 = await imgObj_1.next(), !imgObj_1_1.done;) {
                let item = imgObj_1_1.value;
                const image = await this.imageRepository.findOne({ where: { link: item.link } });
                if (!image) {
                    const newImage = new image_entity_1.Image();
                    newImage.link = item.link;
                    await this.imageRepository.save(newImage);
                    images.push(newImage);
                }
                else {
                    images.push(image);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (imgObj_1_1 && !imgObj_1_1.done && (_a = imgObj_1.return)) await _a.call(imgObj_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var linkObj_1 = __asyncValues(linkObj), linkObj_1_1; linkObj_1_1 = await linkObj_1.next(), !linkObj_1_1.done;) {
                let item = linkObj_1_1.value;
                const link = await this.linksRepository.findOne({ where: { link: item.link } });
                if (!link) {
                    const newLink = new link_entity_1.Link();
                    newLink.link = item.link;
                    await this.linksRepository.save(newLink);
                    images.push(newLink);
                }
                else {
                    links.push(link);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (linkObj_1_1 && !linkObj_1_1.done && (_b = linkObj_1.return)) await _b.call(linkObj_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var secretObj_1 = __asyncValues(secretObj), secretObj_1_1; secretObj_1_1 = await secretObj_1.next(), !secretObj_1_1.done;) {
                let item = secretObj_1_1.value;
                const secret = await this.secretsRepository.findOne({ where: { link: item.link } });
                if (!secret) {
                    const newSecret = new secret_entity_1.Secret();
                    newSecret.link = item.link;
                    await this.secretsRepository.save(newSecret);
                    secrets.push(newSecret);
                }
                else {
                    secrets.push(secret);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (secretObj_1_1 && !secretObj_1_1.done && (_c = secretObj_1.return)) await _c.call(secretObj_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        post.secrets = secrets;
        post.links = links;
        post.images = images;
        post.tags = tags;
        post.author = user;
        await this.postRepository.save(post);
        throw new common_1.HttpException("success", common_1.HttpStatus.OK);
    }
    findAllPublic(page, search) {
        return this.postRepository.getPostsPublic({ page, search });
    }
    findAll(page, search, user) {
        const userRole = user.role;
        return this.postRepository.getPosts({ page, search }, userRole);
    }
    findOne(id, user) {
        const userRole = user.role || 'USER';
        return this.postRepository.getPostById(id, userRole);
    }
    findOnePub(id) {
        return this.postRepository.getPostByIdPub(id);
    }
    async update(id, updatePostDto, tags, user) {
        var e_4, _a, e_5, _b, e_6, _c;
        const updatedPost = await this.postRepository.findOne(id);
        if (updatedPost.author.name !== user.name) {
            throw new common_1.HttpException("It's Not Yours", common_1.HttpStatus.UNAUTHORIZED);
        }
        updatedPost.title = updatePostDto.title;
        updatedPost.tags = tags;
        const imgObj = JSON.parse(JSON.stringify(updatePostDto.images));
        const linkObj = JSON.parse(JSON.stringify(updatePostDto.links));
        const secretObj = JSON.parse(JSON.stringify(updatePostDto.secrets));
        const links = [];
        const secrets = [];
        const images = [];
        try {
            for (var imgObj_2 = __asyncValues(imgObj), imgObj_2_1; imgObj_2_1 = await imgObj_2.next(), !imgObj_2_1.done;) {
                let item = imgObj_2_1.value;
                const image = await this.imageRepository.findOne({ where: { link: item.link } });
                if (!image) {
                    const newImage = new image_entity_1.Image();
                    newImage.link = item.link;
                    await this.imageRepository.save(newImage);
                    images.push(newImage);
                }
                else {
                    images.push(image);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (imgObj_2_1 && !imgObj_2_1.done && (_a = imgObj_2.return)) await _a.call(imgObj_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var linkObj_2 = __asyncValues(linkObj), linkObj_2_1; linkObj_2_1 = await linkObj_2.next(), !linkObj_2_1.done;) {
                let item = linkObj_2_1.value;
                const link = await this.linksRepository.findOne({ where: { link: item.link } });
                if (!link) {
                    const newLink = new link_entity_1.Link();
                    newLink.link = item.link;
                    await this.linksRepository.save(newLink);
                    images.push(newLink);
                }
                else {
                    links.push(link);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (linkObj_2_1 && !linkObj_2_1.done && (_b = linkObj_2.return)) await _b.call(linkObj_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        try {
            for (var secretObj_2 = __asyncValues(secretObj), secretObj_2_1; secretObj_2_1 = await secretObj_2.next(), !secretObj_2_1.done;) {
                let item = secretObj_2_1.value;
                const secret = await this.secretsRepository.findOne({ where: { link: item.link } });
                if (!secret) {
                    const newSecret = new secret_entity_1.Secret();
                    newSecret.link = item.link;
                    await this.secretsRepository.save(newSecret);
                    secrets.push(newSecret);
                }
                else {
                    secrets.push(secret);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (secretObj_2_1 && !secretObj_2_1.done && (_c = secretObj_2.return)) await _c.call(secretObj_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        updatedPost.secrets = secrets;
        updatedPost.links = links;
        updatedPost.images = images;
        await this.postRepository.save(updatedPost);
        if (updatedPost) {
            return updatedPost;
        }
        throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
    }
    remove(id) {
        return this.postRepository.deletePost(id);
    }
    test(page, search, tag) {
        return this.postRepository.test({ page, search, tag });
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(posts_repository_1.PostsRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(images_repository_1.ImagesRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(links_repository_1.LinksRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(secrets_repository_1.SecretsRepository)),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        images_repository_1.ImagesRepository,
        links_repository_1.LinksRepository,
        secrets_repository_1.SecretsRepository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map