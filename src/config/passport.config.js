// Instalamos: npm i passport passport-local

// Importamos los modulos:
const passport = require("passport");
const local = require("passport-local");

//Traemos el UserModel y las funciones de bcrypt
const UserModel = require("../dao/models/user.model.js");
const { createHash, isValidPassword } = require("../utils/hashBcrypt.js");

//Passport con GitHub:
const GitHubStrategy = require("passport-github2");

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  //REGISTER
  passport.use(
    "register",
    new LocalStrategy(
      {
        //Le digo que quiero acceder al objeto request
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          //Verificamos si ya existe un registro con ese email
          let user = await UserModel.findOne({ email });
          if (user) return done(null, false);
          //Si no existe, creamos un nuevo registro de usuario
          let newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          let result = await UserModel.create(newUser);
          //Si todo resulta bien podemos mandar done con el usuario creado

          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //LOGIN
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          //Primero verifico si existe un usuario con ese email
          const user = await UserModel.findOne({ email });
          if (!user) {
            console.log("Usuario incorrecto");
            return done(null, false);
          }
          //Si existe verifico la contraseña
          if (!isValidPassword(password, user)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById({ _id: id });
    done(null, user);
  });

  //Desarrollamos nueva estrategia con GitHub
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.bb5a4219d9f08b8c",
        clientSecret: "29daf5d5bfb6babd6e1f1961c6f72cbb3731dc75",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
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
