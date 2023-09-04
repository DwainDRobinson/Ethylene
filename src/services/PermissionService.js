'use strict';

import { badRequest, badImplementationRequest } from '../response-codes';
import { getPermissions } from '../queries';

exports.getPermissions = async query => {
  try {
    const [error, permissions] = await getPermissions(query);
    if (permissions) {
      return [
        200,
        {
          message: 'Fetcing of permission action was successful.',
          permissions
        }
      ];
    } else {
      return badRequest(error.message);
    }
  } catch (err) {
    console.log('Error getting all permissions: ', err);
    return badImplementationRequest('Error getting permission.');
  }
};
