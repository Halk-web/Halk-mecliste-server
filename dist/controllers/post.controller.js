"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(req, res) {
        try {
            const post = await this.postService.create(req.body);
            console.log(post);
            res.status(202).json(post);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async findAll(req, res) {
        try {
            const posts = await this.postService.findAll();
            res.status(202).json(posts);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async findByTitle(req, res) {
        try {
            const post = await this.postService.findByTitle(req.body.title);
            res.status(202).json(post);
        }
        catch (err) {
            res.status(200).json(err);
        }
    }
    async findOneById(req, res) {
        try {
            const post = await this.postService.findOneById(req.params.id);
            res.status(202).json(post);
        }
        catch (err) {
            res.status(200).json(err);
        }
    }
    async delete(req, res) {
        try {
            res.status(202).json(await this.postService.delete(req.params.id));
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async likePost(req, res) {
        const { profile_id, post_id } = req.body;
        try {
            res.status(202).json(await this.postService.likePost(post_id, profile_id));
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async dislikePost(req, res) {
        const { profile_id, post_id } = req.body;
        try {
            res.status(202).json(await this.postService.dislikePost(post_id, profile_id));
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map