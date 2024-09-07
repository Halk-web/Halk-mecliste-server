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
      const {username,email,password,city,gender,party,politicalView}=req.body;
      const user = await this.authService.create({username:username,password:password,email:email});
      const profile=await this.profileService.create({user_id:user.id,city:city,gender:gender,party:party,politicalView:politicalView});

      console.log("user=",user,"profile=",profile);

      console.log("created user:",user);
      console.log("created profile:",profile);
      
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error });
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
      const user=await this.authService.findById(id);
      res.status(202).json(user);
    }
    catch(err){
      res.status(404).json(err);
    }
  }

  async updateUserById(req:Request,res:Response):Promise<void>{
    try{
      const updatedUser=await this.authService.updateUserById(req.params.id,req.body);
      res.status(202).json(updatedUser);
    }
    catch(err){
      res.status(404).json(err);
    }
  }

  async findAll(req:Request,res:Response):Promise<void>{
    try{
      const users=await this.authService.findAll();
      res.status(202).json(users);
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
