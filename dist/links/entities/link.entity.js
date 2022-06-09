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
exports.Link = void 0;
const post_entity_1 = require("../../posts/entities/post.entity");
const typeorm_1 = require("typeorm");
const links_type_enum_1 = require("../enum/links-type.enum");
let Link = class Link {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Link.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Link.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Link.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Link.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.links, { onDelete: 'CASCADE' }),
    __metadata("design:type", post_entity_1.Post)
], Link.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: links_type_enum_1.default,
        default: links_type_enum_1.default.GDRIVE
    }),
    __metadata("design:type", String)
], Link.prototype, "type", void 0);
Link = __decorate([
    (0, typeorm_1.Entity)('links')
], Link);
exports.Link = Link;
//# sourceMappingURL=link.entity.js.map