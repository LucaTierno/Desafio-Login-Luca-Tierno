//Creamos una instancia de socket.io del lado del cliente
const socket = io();

//Creamos una variable para guardar el usuario:
let user;
const chatBox = document.getElementById("chatBox");

//Sweet Alert 2: es una libreria que nos permite crear alertas personalizadas

//Swal es un objeto global que nos permite usar los métodos de las librerias
//Fire es un método nos permite configurar el alert

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa un usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      //trim nos permite sacar los espacios en blanco del principio y del final de un string.
      //Si el mensaje tiene mas de 9 caracteres, lo enviamos al servidor.
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

//Listener de mensajes:

socket.on("message", (data) => {
  let log = document.getElementById("messagesLogs");
  let messages = "";

  data.forEach((message) => {
    messages = messages + `${message.user}: ${message.message} <br>`;
  });

  log.innerHTML = messages;
});
