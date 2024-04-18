const passport = require("passport");
const jwt = require("passport-jwt");
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const UserModel = require("../models/user.model.js");
const GitHubStrategy = require("passport-github").Strategy;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), // Utiliza ExtractJwt.fromExtractors para extraer el token de la cookie
        secretOrKey: "coderhouse",
      },
      async (jwt_payload, done) => {
        try {
          const user = await UserModel.findById(jwt_payload.user._id);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;

  //Desarrollamos nueva estrategia con GitHub
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.bb5a4219d9f08b8c",
        clientSecret: "29daf5d5bfb6babd6e1f1961c6f72cbb3731dc75",
        callbackURL: "http://localhost:8080/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile: ", profile);
        try {
          let user = await UserModel.findOne({ email: profile._json.email });

          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 21,
              email: profile._json.email,
              password: "",
            };
            let result = await UserModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
