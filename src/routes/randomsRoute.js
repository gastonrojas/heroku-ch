import { Router } from "express";

import randomsController from "../controllers/randomsController.js";

const randomsRoute = new Router()

randomsRoute.get('/', randomsController);

export default randomsRoute