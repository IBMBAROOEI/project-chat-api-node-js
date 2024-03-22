import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entity/User';
import passport from 'passport';
import { AppDataSource } from '../data-source';
import { Request, Response, NextFunction } from 'express';

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await userRepository.findOne(payload.sub);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(null, false);
    }
  })
);

export const authenticationtoken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: Express.User | undefined, info: any) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  })(req, res, next);
};