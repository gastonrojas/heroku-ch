import createServer from "./server.js";

const PORT = process.env.PORT

try {
  const server = await createServer(PORT);
  console.log(`Servidor express escuchando en el puerto ${server.address().port} - PID WORKER ${process.pid}`)
 } catch (error) {
    console.log(error)
  }