const { Strategy } = require("passport");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      //se email existe
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Usuário não encontrado!" });
      } else {
        //valida senha do usuário
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Usuário e/ou senha incorretos!",
          });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
