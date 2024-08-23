import { Repository } from "typeorm";
import { Post, PostEntity } from "../models/post.model";
import { AppDataSource } from "../database/postgresql/database";
import { ProfileEntity } from "../models/profile.model";

export class PostService {
    private postRepository: Repository<PostEntity>;
    private profileRepository: Repository<ProfileEntity>;

    constructor() {
        this.postRepository = AppDataSource.getRepository(PostEntity);
        this.profileRepository = AppDataSource.getRepository(ProfileEntity);
    }

    async create(post: Post): Promise<Post> {
        return await this.postRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async findByTitle(title: string): Promise<Post[]> {
        return await this.postRepository.find({ where: { title: title } });
    }

    async findOneById(id: string): Promise<Post> {
        return await this.postRepository.findOne({
            where: { id },
            relations: { liked_by: true, disliked_by: true, profile: true },
        });
    }

    async delete(id: string) {
        return await this.postRepository.delete(id);
    }

    async likePost(post_id: string, profile_id: string) {
        const profile = await this.profileRepository.findOne({ where: { id: profile_id } });
        const post = await this.postRepository.findOne({
            where: { id: post_id },
            relations: ["liked_by", "disliked_by"],
        });

        if (!post || !profile) return { message: "Post or Profile not found", success: false };

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

    async dislikePost(post_id: string, profile_id: string) {
        const profile = await this.profileRepository.findOne({ where: { id: profile_id } });
        const post = await this.postRepository.findOne({
            where: { id: post_id },
            relations: ["liked_by", "disliked_by"],
        });

        if (!post || !profile) return { message: "Post or Profile not found", success: false };

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
