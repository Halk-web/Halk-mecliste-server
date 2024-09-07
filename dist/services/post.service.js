"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_model_1 = require("../models/post.model");
const database_1 = require("../database/postgresql/database");
const profile_model_1 = require("../models/profile.model");
class PostService {
    constructor() {
        this.postRepository = database_1.AppDataSource.getRepository(post_model_1.PostEntity);
        this.profileRepository = database_1.AppDataSource.getRepository(profile_model_1.ProfileEntity);
    }
    async create(post) {
        return await this.postRepository.save(post);
    }
    async findAll() {
        return await this.postRepository.find({ relations: { profile: true, liked_by: true, disliked_by: true } });
    }
    async search(title) {
        const posts = await this.postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.profile", "profile")
            .leftJoinAndSelect("post.liked_by", "liked_by")
            .leftJoinAndSelect("post.disliked_by", "disliked_by")
            .where("post.title ILIKE :title", { title: `%${title}%` })
            .getMany();
        return posts;
    }
    async findOneById(id) {
        return await this.postRepository.findOne({
            where: { id },
            relations: { liked_by: true, disliked_by: true, profile: true },
        });
    }
    async findOneByProfileId(profile_id) {
        return await this.postRepository.find({ where: { profile_id }, relations: { liked_by: true, disliked_by: true, profile: true } });
    }
    async delete(id) {
        return await this.postRepository.delete(id);
    }
    async updatePostRelations(postId, profileId, actionType) {
        const profile = await this.profileRepository.findOne({ where: { id: profileId } });
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ["liked_by", "disliked_by"],
        });
        console.log(post, profile);
        if (!post || !profile)
            return { message: "Post or Profile not found", success: false };
        const isLiked = actionType === 'like';
        const actionArray = isLiked ? post.liked_by : post.disliked_by;
        const oppositeArray = isLiked ? post.disliked_by : post.liked_by;
        // Eğer oppositeArray'de kullanıcı varsa onu çıkar
        const oppositeIndex = oppositeArray.findIndex((p) => p.id === profileId);
        if (oppositeIndex !== -1) {
            oppositeArray.splice(oppositeIndex, 1);
        }
        // Eğer actionArray'de kullanıcı varsa, onu çıkar (beğenip tekrar beğenme ya da beğenmeme durumunda)
        const actionIndex = actionArray.findIndex((p) => p.id === profileId);
        if (actionIndex !== -1) {
            actionArray.splice(actionIndex, 1);
        }
        else {
            // Kullanıcı actionArray'de değilse, ekle (yeni beğenme ya da beğenmeme)
            actionArray.push(profile);
        }
        // Postu güncelle ve kaydet
        return await this.postRepository.save(post);
    }
    async likePost(postId, profileId) {
        return this.updatePostRelations(postId, profileId, 'like');
    }
    async dislikePost(postId, profileId) {
        return this.updatePostRelations(postId, profileId, 'dislike');
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map