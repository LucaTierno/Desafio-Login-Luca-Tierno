const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const PUERTO = 8080;
require("./database.js");

//Passport
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");

//Import Routes
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const sessionsRouter = require("./routes/sessions.router.js");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(
  session({
    secret: "secretCoder",
    //Es el valor para firma la cookie.
    resave: true,
    //Esto me permite tener la sesion activa frente a la inactividad del usuario
    saveUninitialized: true,
    //Me permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada paraa contener.

    //Utilizamos Mongo Storage:

    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://lucatierno:luE8JYX4cFxxYnCa@luca.9uzn73g.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Luca",
      ttl: 100,
    }),
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Routing:
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", sessionsRouter);
app.use("/", viewsRouter);

//Escuchamos en el PUERTO 8080:
const httpServer = app.listen(PUERTO, () => {
  console.log(
    `Escuchando en el puerto: ${PUERTO}, link: http://localhost:${PUERTO}`
  );
});
