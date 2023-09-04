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

export const getPermissions = async query => {
  try {
    const { Permission } = models;
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const skipIndex = (page - 1) * limit;

    const filter = [];
    for (const [key, value] of Object.entries(query)) {
      if (key != 'page' && key != 'limit') {
        filter.push({ [key]: { $regex: value, $options: 'i' } });
      }
    }

    let objectFilter = {};
    if (filter.length > 0) {
      objectFilter = {
        $and: filter
      };
    }

    let sortString = '-id';

    if (query.sort) {
      sortString = query.sort;
    }

    const permissions = await Permission.find(objectFilter, queryOps)
      .limit(limit)
      .skip(skipIndex)
      .sort(sortString)
      .lean()
      .exec();
    const total = await Permission.find(objectFilter, queryOps).count();
    const result = permissions.map(user => ({
      ...user,
      total,
      pages: Math.ceil(total / limit)
    }));
    return [null, result];
  } catch (err) {
    console.log('Error getting permission data from db: ', err);
    return [new Error('Unable to get permissions from db.'), null];
  }
};
