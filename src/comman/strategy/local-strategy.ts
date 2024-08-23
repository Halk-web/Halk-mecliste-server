import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AuthService } from '../../services/auth.service';
import bcrypt from 'bcryptjs';

export function initializeLocalPassport(authService: AuthService) {
  passport.use(new LocalStrategy(
    async (email: string, password: string, done: Function) => {
      try {
        const user = await authService.findByEmail(email);
        if (!user) {
          return done(null, false, { message: 'No user with that username' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (error) {
        return done(error);
      }
    }
  ));
}
