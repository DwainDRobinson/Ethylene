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

export const generateAuthJwtToken = user => {
  const { isAdmin, email, userId } = user;
  const expirationTime = moment().add(TOKEN_EXPIRY, 'minutes').valueOf() / 1000;
  const payload = { isAdmin, email, userId };
  try {
    const token = sign(
      {
        exp: Math.ceil(expirationTime),
        data: payload
      },
      jwtSecret
    );
    return token;
  } catch {
    return undefined;
  }
};

export const verifyJwtToken = token => {
  try {
    const decoded = verify(token, jwtSecret);
    return [null, decoded];
  } catch (err) {
    return [err, null];
  }
};
