"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const profile_service_1 = require("../services/profile.service");
const profileRouter = (0, express_1.Router)();
const profileService = new profile_service_1.ProfileService();
const profileController = new profile_controller_1.ProfileController(profileService);
profileRouter.post("/create", profileController.create.bind(profileController));
profileRouter.get("/findAll", profileController.findAll.bind(profileController));
profileRouter.get("/:id", profileController.findById.bind(profileController));
profileRouter.put("/update/:id", profileController.update.bind(profileController));
profileRouter.delete("/:id", profileController.delete.bind(profileController));
exports.default = profileRouter;
//# sourceMappingURL=profile.router.js.map