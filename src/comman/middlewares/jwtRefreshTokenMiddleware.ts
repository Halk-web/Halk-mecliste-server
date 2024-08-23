import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretRefresh = process.env.JWT_SECRET_REFRESH ;

interface JwtPayload {
  id: string;
  email: string;
}

export function authenticateRefreshToken(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, secretRefresh, (err, payload: JwtPayload) => {
    if (err) return res.sendStatus(403);
    req.user = payload; 
    next();
  });
}
