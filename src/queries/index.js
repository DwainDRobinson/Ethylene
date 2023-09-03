'use strict';

import mongoose from 'mongoose';
import config from '../config';
import models from '../models';

const { dbUser, dbPass, clusterDomain, dbName } = config.sources.database;

const queryOps = {
  __v: 0,
  _id: 0,
  createdAt: 0,
  updatedAt: 0
};

export const getDBUri = () => {
  return `mongodb+srv://${dbUser}:${dbPass}@${clusterDomain}/${dbName}?retryWrites=true&w=majority`;
};
