import { numCpus } from "../../config.js";

const infoController = (req, res) => {
    console.log('bueeenas')
    res.json({
        'Argumentos de entrada': process.argv,
        'Sistema operativo': process.env.OS,
        'Version de Nodejs': process.version,
        'Memoria total reservada': process.memoryUsage().rss,
        'Path de ejecucion': process.execPath,
        'Id del proceso': process.pid,
        'Carpeta del proyecto': process.cwd(),
        'Numero de Cpus': numCpus,
    });
};

export default infoController
