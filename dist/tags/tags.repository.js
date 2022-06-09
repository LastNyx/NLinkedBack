"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./entities/tag.entity");
let TagsRepository = class TagsRepository extends typeorm_1.Repository {
    async getTags(query) {
        const take = 5;
        const page = query.page || "1";
        const skip = (page - 1) * take;
        const search = query.search || "";
        const tags = await this.find({
            where: { name: (0, typeorm_1.Like)('%' + search + '%') },
            order: {
                id: 'ASC'
            },
        });
        return {
            data: tags,
        };
    }
    async getTagsById(query, id) {
        const take = 5;
        const page = query.page || "1";
        const skip = (page - 1) * take;
        const tag = await this
            .createQueryBuilder("tags")
            .where("tags.id = :id", { id })
            .relation(tag_entity_1.Tag, "posts")
            .of(1)
            .loadMany();
        if (tag) {
            return tag;
        }
        throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteTag(id) {
        const deleteTag = await this.delete(id);
        if (!deleteTag.affected) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('Success', common_1.HttpStatus.OK);
    }
    async forEach(tagsArray) {
        var e_1, _a;
        const tagsObj = JSON.parse(JSON.stringify(tagsArray));
        const tags = [];
        try {
            for (var tagsObj_1 = __asyncValues(tagsObj), tagsObj_1_1; tagsObj_1_1 = await tagsObj_1.next(), !tagsObj_1_1.done;) {
                let item = tagsObj_1_1.value;
                const tag = await this.findOne({ where: { name: item.name } });
                if (!tag) {
                    const newTag = new tag_entity_1.Tag();
                    newTag.name = item.name;
                    await this.save(newTag);
                    tags.push(newTag);
                }
                else {
                    tags.push(tag);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tagsObj_1_1 && !tagsObj_1_1.done && (_a = tagsObj_1.return)) await _a.call(tagsObj_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return tags;
    }
};
TagsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(tag_entity_1.Tag)
], TagsRepository);
exports.TagsRepository = TagsRepository;
//# sourceMappingURL=tags.repository.js.map