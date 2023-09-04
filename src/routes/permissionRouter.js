'use strict';

import express from 'express';
import { PermissionController } from '../controllers';
import { getAllQueryValidation } from '../validations';
import { validationHandler } from '../middlewares';

const { Router } = express;
const router = Router();

router.get(
  '/booth-service/getPermissions',
  getAllQueryValidation,
  validationHandler,
  PermissionController.getPermissions
);

export default router;
