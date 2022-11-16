import pino from 'pino';

const logger = pino()

const infoLogger = (req, res, next) =>{
    logger.info(`Peticion a ruta ${req.path} con metodo ${req.method}`)
    next()
}

export default infoLogger;