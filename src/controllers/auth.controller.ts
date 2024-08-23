//chatgbt mesaj
//me metodunda kullanıcının şifresi gitmemeli yani password gitmesin
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile.service';

export class AuthController {
  private authService: AuthService;
  private profileService:ProfileService;

  constructor(authService: AuthService,profileService:ProfileService) {
    this.authService = authService;
    this.profileService=profileService;
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.create(req.body as User);
      const profile=await this.profileService.create({user_id:user.id});

      console.log("user=",user,"profile=",profile);

      console.log("created user:",user);
      console.log("created profile:",profile);
      
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;
    try {
      const user = await this.authService.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'User not found' });

      const isValid = await this.authService.validatePassword(user, password);
      if (!isValid) return res.status(401).json({ message: 'Invalid password' });

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10h' });
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      // Save refreshToken in database (pseudo-code)
      await this.authService.saveRefreshToken(user.id, refreshToken);

      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  async findOneById(req:Request,res:Response):Promise<void>{
    const id=req.params.id;

    try{
      res.status(202).json(await this.authService.findById(id));
    }
    catch(err){
      res.status(404).json(err);
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET) as { id: string };
      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token.' });
    }
  }

  async me(req: any, res: Response): Promise<void> {
    if (req.user) {
      const user=await this.authService.findById(req.user.id);
      res.json(user); // Bu satırda `void` döndürülüyor
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
