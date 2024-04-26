const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require("path")
const PUERTO = 8080;
const compression = require("express-compression");
const manejadorError = require("./middleware/error.js")
const addLogger = require("./utils/logger.js")

//Import Routes
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const sessionsRouter = require("./routes/sessions.router.js");
const mockingRouter = require("./routes/mockingUser.router.js");
const loggerRouter = require("./routes/loggerTest.router.js")

const session = require("express-session");
const MongoStore = require("connect-mongo");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cors());
app.use(compression({
  brotli: {
    enable: true,
    zlib: {}  
  }
}));
app.use(manejadorError);
app.use(addLogger);

//Passport 
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Routing:
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", sessionsRouter);
app.use("/", viewsRouter);
app.use("/mockingproducts", mockingRouter);
app.use("/loggerTest", loggerRouter);

//Escuchamos en el PUERTO 8080:
const httpServer = app.listen(PUERTO, () => {
  console.log(
    `Escuchando en el puerto: ${PUERTO}, link: http://localhost:${PUERTO}`
  );
});

///Websockets: 
const SocketManager = require("./sockets/socketmanager.js");
new SocketManager(httpServer);