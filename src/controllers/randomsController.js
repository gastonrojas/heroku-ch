import { fork } from 'child_process'
import getRandomNumbers from '../utils/getRandomNumbers.js'

const randomsController = (req, res) =>{

    let CANT = req.query.cant ?? 100000

    res.json(getRandomNumbers(CANT))

    // const forked = fork('src/api/random.js')

    // forked.on('message', msg=>{
    //     if (msg === 'listo'){
    //         forked.send(CANT)
    //     } else {
    //         res.json({PID_WORKER: process.pid , msg})
    //     }
    // })

}


export default randomsController