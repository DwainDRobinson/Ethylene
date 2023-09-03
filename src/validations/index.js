'use strict';

/**
 * https://github.com/validatorjs/validator.js#validators
 */
import {
  query,
  body,
  validationResult,
  param,
  header
} from 'express-validator';

const headerValidation = [
  header('Authorization')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide authorization token')
];

const invoiceQueryValidation = [
  query('page')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a page for invoices'),
  query('limit')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Must provide a limit for invoices'),
  ...headerValidation
];

export { invoiceQueryValidation, headerValidation, validationResult };
