"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const post_service_1 = require("../services/post.service");
const postRouter = (0, express_1.Router)();
const postService = new post_service_1.PostService();
const postController = new post_controller_1.PostController(postService);
postRouter.post("/create", postController.create.bind(postController));
postRouter.get("/findAll", postController.findAll.bind(postController));
postRouter.get("/search/:title", postController.search.bind(postController));
postRouter.get("/findOne/:id", postController.findOneById.bind(postController));
postRouter.get("/findByProfileId/:profile_id", postController.findByProfileId.bind(postController));
postRouter.delete("/delete/:id", postController.delete.bind(postController));
postRouter.post("/like", postController.likePost.bind(postController));
postRouter.post("/dislike", postController.dislikePost.bind(postController));
exports.default = postRouter;
//# sourceMappingURL=post.router.js.map