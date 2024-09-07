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
exports.ProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
const post_model_1 = require("./post.model");
let ProfileEntity = class ProfileEntity {
};
exports.ProfileEntity = ProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "profile_img", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "politicalView", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_model_1.UserEntity, user => user.profile),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_model_1.UserEntity)
], ProfileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_model_1.PostEntity, post => post.profile),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_model_1.PostEntity, post => post.liked_by),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "liked_posts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_model_1.PostEntity, post => post.disliked_by),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "disliked_posts", void 0);
exports.ProfileEntity = ProfileEntity = __decorate([
    (0, typeorm_1.Entity)("profiles")
], ProfileEntity);
//# sourceMappingURL=profile.model.js.map