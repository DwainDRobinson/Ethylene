'use strict';

import express from 'express';
import { cache } from '../middlewares';
import { fancyTimeFormat } from '../utils/time';

const { Router } = express;
const { version } = require('../../package.json');

const router = Router();

router.get('/booth-service/', cache(), (_, res) => {
  res
    .status(200)
    .send({ message: 'Welcome to Ethylene Booth Manager Service!' });
});

router.get('/booth-service/probeCheck', (_, res) => {
  res.status(200).send({
    uptime: fancyTimeFormat(process.uptime()),
    date: new Date(),
    message: 'Ethylene Booth Manager service up and running!',
    appVersion: version
  });
});

export default router;
