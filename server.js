import http from 'http';
import {Server} from 'socket.io' 

import {app} from './app.js';
import { products, messages } from './src/containers/MongodbContainer.js';



export default function createServer(PORT) {
  return new Promise((resolve, reject)=>{
    const httpServer = http.createServer(app);
    const server = httpServer.listen(PORT);
    const io = new Server(httpServer);
  
    io.on('connection', async (socket) => {
      socket.emit('products', await products.getAll());
      socket.emit('messages', await messages.getAll());
      socket.on('newProduct', async (newProduct) => {
        await products.save(newProduct);
        io.sockets.emit('products', await products.getAll());
      });
      socket.on('newMessage', async (newMessage) => {
        await messages.save(newMessage);
        io.sockets.emit('messages', await messages.getAll());
      });
  
    });
    server.on('listening', () => resolve(server))
    server.on('error', error => reject(error));
  })
}


