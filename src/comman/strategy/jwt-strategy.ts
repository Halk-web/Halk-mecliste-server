import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import * as dotenv from "dotenv";

dotenv.config();

export function initializePassport(authService: AuthService) {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.JWT_SECRET}`
  };

  passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await authService.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));
}
