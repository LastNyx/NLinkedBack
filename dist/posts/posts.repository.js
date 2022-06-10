"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const common_1 = require("@nestjs/common");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let PostsRepository = class PostsRepository extends typeorm_1.Repository {
    async test(query) {
        const limit = 5;
        const page = query.page || "1";
        const search = query.search || "";
        const id = query.tag || "";
        const skip = (page - 1) * limit;
        const posts = this.createQueryBuilder("posts")
            .leftJoinAndSelect("posts.author", "author")
            .leftJoinAndSelect("posts.images", "images")
            .leftJoinAndSelect("posts.tags", "tags")
            .orderBy("posts.created_at", "DESC");
        if (id !== "") {
            posts.where("tags.id = :id", { id: id });
        }
        posts.groupBy("posts.title");
        return await (0, nestjs_typeorm_paginate_1.paginate)(posts, { page, limit, route: '/posts/test' });
    }
    async getPosts(query, userRole) {
        const take = 5;
        const page = query.page || "1";
        const skip = (page - 1) * take;
        const search = query.search || "";
        let secret = [];
        if (userRole == "ADMIN" || userRole == "CONTRIBUTOR" || userRole == "PREMIUM_USER") {
            secret = ['secrets'];
        }
        const [posts, total] = await this.findAndCount({
            where: [
                { title: (0, typeorm_1.Like)('%' + search + '%') },
            ],
            order: {
                id: 'DESC'
            },
            relations: secret,
            take: take,
            skip: skip
        });
        const page_count = Math.ceil(total / take);
        const hasPrev = page > 1;
        const hasNext = page < page_count;
        let prev = null;
        let next = null;
        if (hasPrev) {
            prev = parseInt(page) - 1;
        }
        if (hasNext) {
            next = parseInt(page) + 1;
        }
        return {
            search_query: search,
            current_page: page,
            data: posts,
            total: total,
            page_count: page_count,
            hasPrev: page > 1,
            prev: prev,
            hasNext: page < page_count,
            next: next,
            per_page: take,
        };
    }
    async getPostsPublic(query) {
        const take = 5;
        const page = query.page || "1";
        const skip = (page - 1) * take;
        const search = query.search || "";
        const id = query.tag || 24;
        if (id !== "") {
            const tagId = id;
        }
        const [posts, total] = await this.findAndCount({
            where: [
                { title: (0, typeorm_1.Like)('%' + search + '%') },
            ],
            order: {
                id: 'DESC'
            },
            take: take,
            skip: skip
        });
        const page_count = Math.ceil(total / take);
        const hasPrev = page > 1;
        const hasNext = page < page_count;
        let prev = null;
        let next = null;
        if (hasPrev) {
            prev = parseInt(page) - 1;
        }
        if (hasNext) {
            next = parseInt(page) + 1;
        }
        return {
            search_query: search,
            current_page: page,
            data: posts,
            total: total,
            page_count: page_count,
            hasPrev: page > 1,
            prev: prev,
            hasNext: page < page_count,
            next: next,
            per_page: take,
        };
    }
    async getPostById(id, userRole) {
        let secret = ['links'];
        if (userRole == "ADMIN" || userRole == "CONTRIBUTOR" || userRole == "PREMIUM_USER") {
            secret.push('secrets');
        }
        const post = await this.findOne(id, { relations: secret });
        if (post) {
            return post;
        }
        throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async getPostByIdPub(id) {
        const post = await this.findOne(id);
        if (post) {
            return post;
        }
        throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async deletePost(id) {
        const deletePost = await this.delete(id);
        if (!deletePost.affected) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('Success', common_1.HttpStatus.OK);
    }
};
PostsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(post_entity_1.Post)
], PostsRepository);
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=posts.repository.js.map