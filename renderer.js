// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const dialog = require('electron').remote;
const io = require('socket.io-client')
window.mimiFix = new MimimiFix();
window.fs = fs;
window.dialog = dialog;
window.socket = io('http://localhost');
socket.on('welcome',function(data){
  console.log('CONECTADO SOCKET');
});
mimiFix.renderApp();