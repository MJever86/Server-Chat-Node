/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 8080 });

var fs=require('fs');



var datos=[];

//esta opcion permite chat en grupo
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
      console.log(data);
        guardarMensajes(data);
      
    // Broadcast para todos los demas clientes
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
    cargarMensajes(ws);
});

function guardarMensajes(mensaje){
    if(mensaje.indexOf("se ha unido a la conversacion") == -1) {
        fs.appendFile('mensajes.txt', mensaje+"\n", function (err) {
  if (err) return console.log(err);

});

}
    
}
function cargarMensajes(ws){
    fs.readFile('mensajes.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var datos=data.toString().split("\n");
      for(var i=0;i<datos.length;i++){
          ws.send(datos[i]);
      }
      
      
    });
}