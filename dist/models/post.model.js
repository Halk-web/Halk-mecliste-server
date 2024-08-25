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
exports.PostEntity = void 0;
const typeorm_1 = require("typeorm");
const profile_model_1 = require("./profile.model");
let PostEntity = class PostEntity {
};
exports.PostEntity = PostEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PostEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PostEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "profile_id" }),
    __metadata("design:type", String)
], PostEntity.prototype, "profile_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_model_1.ProfileEntity, profile => profile.posts),
    (0, typeorm_1.JoinColumn)({ name: "profile_id" }),
    __metadata("design:type", profile_model_1.ProfileEntity)
], PostEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => profile_model_1.ProfileEntity, profile => profile.liked_posts),
    (0, typeorm_1.JoinTable)({
        name: "post_likes", // Join table ismi
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "profile_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], PostEntity.prototype, "liked_by", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => profile_model_1.ProfileEntity, profile => profile.disliked_posts),
    (0, typeorm_1.JoinTable)({
        name: "post_dislikes", // Join table ismi
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "profile_id",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], PostEntity.prototype, "disliked_by", void 0);
exports.PostEntity = PostEntity = __decorate([
    (0, typeorm_1.Entity)("posts")
], PostEntity);
//# sourceMappingURL=post.model.js.map