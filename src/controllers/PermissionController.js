'use strict';

import { PermissionService } from '../services';

exports.getPermissions = async (req, res, next) => {
  try {
    const { query } = req;
    const [statusCode, response] = await PermissionService.getPermissions(
      query
    );
    res.status(statusCode).send(response);
  } catch (err) {
    console.log(`Error getting permissions: `, err);
    next(err);
  }
};
