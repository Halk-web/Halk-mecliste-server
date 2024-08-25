"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_service_1 = require("../services/auth.service");
const auth_middleware_1 = require("../comman/middlewares/auth.middleware");
const profile_service_1 = require("../services/profile.service");
const authRouter = (0, express_1.Router)();
const authService = new auth_service_1.AuthService();
const profileService = new profile_service_1.ProfileService();
const authController = new auth_controller_1.AuthController(authService, profileService);
authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.get("/findOne/:id", authController.findOneById.bind(authController));
authRouter.post('/refresh', authController.refresh.bind(authController));
authRouter.get('/me', auth_middleware_1.authenticateToken, authController.me.bind(authController));
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map