import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { ProfileService } from "../services/profile.service";

const profileRouter = Router();
const profileService = new ProfileService();
const profileController = new ProfileController(profileService);

profileRouter.post("/create", profileController.create.bind(profileController));
profileRouter.get("/findAll", profileController.findAll.bind(profileController));
profileRouter.get("/:id", profileController.findById.bind(profileController));
profileRouter.put("/update/:id", profileController.update.bind(profileController));
profileRouter.delete("/:id", profileController.delete.bind(profileController));

export default profileRouter;
