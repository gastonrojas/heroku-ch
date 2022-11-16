import express from 'express';

import { root } from './src/routes/root.js';
import { passportMiddleware, passportSessionHandler } from './src/middlewares/passport.js';
import {sessionHandler } from './src/middlewares/session.js';
import { authRouter } from './src/routes/authRoute.js';
import infoRoute from './src/routes/infoRoute.js';
import randomsRoute from './src/routes/randomsRoute.js';
import infoLogger from './src/middlewares/infoLogger.js';
import notFound from './src/middlewares/404.js';


export const app = express();


// middlewares

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionHandler)
app.use(passportMiddleware)
app.use(passportSessionHandler)
app.set('views', 'public/views');
app.set('view engine', 'ejs');

// rutas

app.use('/', infoLogger,root);
app.use('/auth', infoLogger, authRouter);
app.use('/info', infoLogger,infoRoute);
app.use('/api/randoms', infoLogger, randomsRoute);
app.use(notFound)

