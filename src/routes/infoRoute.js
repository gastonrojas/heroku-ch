import { Router } from "express";
import compression from 'compression';

import infoController from "../controllers/infoController.js";

const infoRoute = new Router()

infoRoute.use(compression())
infoRoute.get('/', infoController)

export default infoRoute
