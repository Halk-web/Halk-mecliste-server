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
        return await this.postRepository.find({relations:{profile:true,liked_by:true,disliked_by:true}});
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

    private async updatePostRelations(postId: string, profileId: string, actionType: 'like' | 'dislike') {
        const profile = await this.profileRepository.findOne({ where: { id: profileId } });
        const post = await this.postRepository.findOne({
            where: { id: postId },
            relations: ["liked_by", "disliked_by"],
        });

        console.log(post,profile);
    
        if (!post || !profile) return { message: "Post or Profile not found", success: false };
    
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
        } else {
            // Kullanıcı actionArray'de değilse, ekle (yeni beğenme ya da beğenmeme)
            actionArray.push(profile);
        }
    
        // Postu güncelle ve kaydet
        return await this.postRepository.save(post);
    }
    
    
    async likePost(postId: string, profileId: string) {
        return this.updatePostRelations(postId, profileId, 'like');
    }
    
    async dislikePost(postId: string, profileId: string) {
        return this.updatePostRelations(postId, profileId, 'dislike');
    }
    
    
}
