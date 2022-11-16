import pino from 'pino';

const logger = pino('pinoLogs/warn.log')

const notFound = (req, res , next) =>{
    res.status(404).render('not-found');
    logger.warn(`Peticion a ruta no establecida: ${req.path}`)
}

export default notFound;