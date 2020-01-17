import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

//passport로 쿠키에 사용자 아이디를 담고,
passport.serializeUser(User.serializeUser());
//그아이디를 통해서 사용자를 식별한다
passport.deserializeUser(User.deserializeUser());
