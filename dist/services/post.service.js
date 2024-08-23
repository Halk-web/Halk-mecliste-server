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
        return await this.postRepository.find();
    }
    async findByTitle(title) {
        return await this.postRepository.find({ where: { title: title } });
    }
    async findOneById(id) {
        return await this.postRepository.findOne({
            where: { id },
            relations: { liked_by: true, disliked_by: true, profile: true },
        });
    }
    async delete(id) {
        return await this.postRepository.delete(id);
    }
    async likePost(post_id, profile_id) {
        const profile = await this.profileRepository.findOne({ where: { id: profile_id } });
        const post = await this.postRepository.findOne({
            where: { id: post_id },
            relations: ["liked_by", "disliked_by"],
        });
        if (!post || !profile)
            return { message: "Post or Profile not found", success: false };
        // Check if the user has already disliked the post
        const dislikedIndex = post.disliked_by.findIndex((p) => p.id === profile_id);
        if (dislikedIndex !== -1) {
            post.disliked_by.splice(dislikedIndex, 1);
        }
        // Check if the user has already liked the post
        const likedIndex = post.liked_by.findIndex((p) => p.id === profile_id);
        if (likedIndex === -1) {
            post.liked_by.push(profile);
        }
        return await this.postRepository.save(post);
    }
    async dislikePost(post_id, profile_id) {
        const profile = await this.profileRepository.findOne({ where: { id: profile_id } });
        const post = await this.postRepository.findOne({
            where: { id: post_id },
            relations: ["liked_by", "disliked_by"],
        });
        if (!post || !profile)
            return { message: "Post or Profile not found", success: false };
        // Check if the user has already liked the post
        const likedIndex = post.liked_by.findIndex((p) => p.id === profile_id);
        if (likedIndex !== -1) {
            post.liked_by.splice(likedIndex, 1);
        }
        // Check if the user has already disliked the post
        const dislikedIndex = post.disliked_by.findIndex((p) => p.id === profile_id);
        if (dislikedIndex === -1) {
            post.disliked_by.push(profile);
        }
        return await this.postRepository.save(post);
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map