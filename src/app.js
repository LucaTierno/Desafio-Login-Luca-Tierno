const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Routing:
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//Escuchamos en el PUERTO 8080:
const httpServer = app.listen(PUERTO, () => {
  console.log(
    `Escuchando en el puerto: ${PUERTO}, link: http://localhost:${PUERTO}/`
  );
});

//Desafio Chat en el ecommerce:
const MessageModel = require("./dao/models/message.model.js");
const io = new socket.Server(httpServer);

let messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", async (data) => {

    //Guardo el mensaje en MongoDB:
    await MessageModel.create(data);

    //Obtengo los mensajes de MongoDB y se los paso al cliente:
    const messages = await MessageModel.find();
    io.sockets.emit("message", messages);
  });
});
