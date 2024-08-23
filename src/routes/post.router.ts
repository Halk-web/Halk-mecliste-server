import { Router } from "express";
import { PostController} from "../controllers/post.controller";
import { PostService } from "../services/post.service";

const postRouter=Router();
const postService=new PostService();
const postController=new PostController(postService);

postRouter.post("/create",postController.create.bind(postController));
postRouter.get("/findAll",postController.findAll.bind(postController));
postRouter.get("/findByTitle",postController.findByTitle.bind(postController));
postRouter.get("/findOne/:id",postController.findOneById.bind(postController));
postRouter.delete("/delete",postController.delete.bind(postController));
postRouter.post("/like",postController.likePost.bind(postController));
postRouter.post("/dislike",postController.dislikePost.bind(postController));

export default postRouter;


