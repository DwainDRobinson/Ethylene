'use strict';

import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
import config from '../config';

const { Schema } = mongoose;
const autoIncrement = mongooseSequence(mongoose);
const { NODE_ENV } = config;

//ROLE SCHEMA
//  ============================================
const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    permissions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Permission'
      }
    ]
  },
  { timestamps: true }
);

/**
 * Set the autoCreate option on models if not on production
 */
roleSchema.set('autoCreate', NODE_ENV !== 'production');

/**
 * Increments  everytime an instances is created
 */
roleSchema.plugin(autoIncrement, { inc_field: 'roleId' });

/**
 * Create role model out of roleSchema
 */
const Role = mongoose.model('Role', roleSchema);

export default Role;
