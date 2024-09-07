import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { authenticateToken } from '../comman/middlewares/auth.middleware'
import { ProfileService } from '../services/profile.service';

const authRouter = Router();
const authService = new AuthService();
const profileService=new ProfileService();
const authController = new AuthController(authService,profileService);

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.get("/findOne/:id",authController.findOneById.bind(authController));
authRouter.put("/update/:id",authController.updateUserById.bind(authController));
authRouter.get("/findAll",authController.findAll.bind(authController));
authRouter.post('/refresh', authController.refresh.bind(authController));
authRouter.get('/me', authenticateToken, authController.me.bind(authController));

export default authRouter;


