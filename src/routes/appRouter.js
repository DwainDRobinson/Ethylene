'use strict';

import express from 'express';
import { cache } from '../middlewares';
import { fancyTimeFormat } from '../utils/time';

const { Router } = express;
const { version } = require('../../package.json');

const router = Router();

router.get('/invoice-service/', cache(), (_, res) => {
  res
    .status(200)
    .send({ message: 'Welcome to Ethylene Invoice Manager Service!' });
});

router.get('/invoice-service/probeCheck', (_, res) => {
  res.status(200).send({
    uptime: fancyTimeFormat(process.uptime()),
    date: new Date(),
    message: 'Ethylene Invoice Manager service up and running!',
    appVersion: version
  });
});

export default router;
