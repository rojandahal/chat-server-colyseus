import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../http/models/UserModel";

export default function configurePassport(passport: any) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, cb) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return cb(null, false, { message: "Incorrect email." });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return cb(null, false, { message: "Incorrect password." });
          }
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, cb: any) => {
    console.log("serializeUser", user);
    cb(null, {
      email: user.email,
      password: user.password,
    });
  });

  passport.deserializeUser((user: any, cb: any) => {
    console.log("deserializeUser", user);
    cb(null, {
      email: user.email,
      password: user.password,
    });
  });
}
