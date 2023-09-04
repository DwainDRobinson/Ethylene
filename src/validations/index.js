'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
import { query, body, validationResult, param } from 'express-validator';

const getAllQueryValidation = [
  query('page')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a page number for resource.'),
  query('limit')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a limit for resources returned.')
];

const permissionBodyValidation = [
  body('name')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a name for permission.'),
  body('description')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a description for permission.')
];

export { getAllQueryValidation, permissionBodyValidation, validationResult };
