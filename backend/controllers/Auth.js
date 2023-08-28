import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTstrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import userModel from "../models/Users.js";

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const checkUser = await userModel.findOne({ email });
      if (checkUser) {
        return done("User Already Exists", false);
      }
      const fullName = req.body.fullName;
      try {
        const user = await userModel.create({ fullName, email, password });
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });

        if (!user) {
          return done("User not found", false);
        }

        const validate = await user.isPasswordValid(password);

        if (!validate) {
          return done("Wrong Password", false);
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromHeader("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default {};
