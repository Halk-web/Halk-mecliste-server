import { Request, Response } from "express";
import { PostService } from "../services/post.service";
import { Post } from "../models/post.model";

export class PostController{
    private postService:PostService;

    constructor(postService:PostService){
        this.postService=postService;
    }

    async create(req:Request,res:Response):Promise<void>{
        try{
            const post=await this.postService.create(req.body as Post);
            console.log(post);
            res.status(202).json(post);
        }catch(err){
            res.status(400).json(err);
        }
    }

    async findAll(req:Request,res:Response):Promise<void>{
        try{
            const posts=await this.postService.findAll();
            res.status(202).json(posts);
        }
        catch(err){
            res.status(400).json(err);
        }
    }

    async findByTitle(req:Request,res:Response):Promise<void>{
        try{
            const post=await this.postService.findByTitle(req.body.title);
            res.status(202).json(post);
        }catch(err){
            res.status(200).json(err);
        }
    }

    async findOneById(req:Request,res:Response):Promise<void>{
        try{
            const post=await this.postService.findOneById(req.params.id);
            res.status(202).json(post);
        }catch(err){
            res.status(200).json(err);
        }
    }

    async delete(req:Request,res:Response):Promise<void>{
        try{
            res.status(202).json(await this.postService.delete(req.params.id));
        }
        catch(err){
            res.status(400).json(err);
        }
    }

    async likePost(req:Request,res:Response):Promise<void>{
        const {profile_id,post_id}=req.body;

        try{
            res.status(202).json(await this.postService.likePost(post_id,profile_id));
        }
        catch(err){
            res.status(400).json(err);
        }
    }

    async dislikePost(req:Request,res:Response):Promise<void>{
        const {profile_id,post_id}=req.body;

        try{
            res.status(202).json(await this.postService.dislikePost(post_id,profile_id));
        }
        catch(err){
            res.status(400).json(err);
        }
    }
}