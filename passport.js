import passport from 'passport';
import GithubStrategy from 'passport-github';
import User from './models/User';
import { githubLoginCallback } from './controllers/userController';
import routes from './routes';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

// passport로 쿠키에 사용자 아이디를 담고,
passport.serializeUser((user, done) => done(null, user));
// 그아이디를 통해서 사용자를 식별한다
passport.deserializeUser((user, done) => done(null, user));
