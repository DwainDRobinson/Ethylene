'use strict';

import NodeCache from 'node-cache';
import { validationResult } from '../validations';
import config from '../config';
import { getToken, verifyJwtToken } from '../utils/token';

const nodeCache = new NodeCache();
const { defaultCacheTtl } = config;

const requestResponse = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    console.info(
      `${res.statusCode} ${res.statusMessage}; ${res.get('X-Response-Time')} ${
        res.get('Content-Length') || 0
      }b sent`
    );
  });
  next();
};

const errorHandler = (error, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const status = error.status || 500;
  res.status(status).send({ message: error.message });
};

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const cache = () => {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = nodeCache.get(key);
    if (cachedBody) {
      res.send(JSON.parse(cachedBody));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        nodeCache.set(key, body, defaultCacheTtl);
        res.sendResponse(body);
      };
      next();
    }
  };
};

const isAuthenicated = (req, res, next) => {
  const token = getToken(req);
  const [error, decoded] = verifyJwtToken(token);
  if (error) {
    if (error.name === 'TokenExpiredError') {
      next({
        status: 403,
        message:
          'Token has expired. Please login again and fetch a fresh authorization token.'
      });
    }
    next({
      error: error.name
    });
  }
  if (decoded) {
    next();
  }
};

export {
  requestResponse,
  errorHandler,
  validationHandler,
  cache,
  isAuthenicated
};
