'use strict';

import jwt from 'jsonwebtoken';
import config from '../config';

const { verify } = jwt;
const { jwtSecret } = config;

export const getToken = req => {
  const token = req.get('X-Access-Token') || req.get('Authorization');
  if (token && token.split(' ')[0] === 'Bearer') {
    return token.split(' ')[1];
  }
  return null;
};

export const verifyJwtToken = token => {
  try {
    const decoded = verify(token, jwtSecret);
    return [null, decoded];
  } catch (err) {
    return [err, null];
  }
};
