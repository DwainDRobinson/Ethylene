'use strict';

import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
import config from '../config';

const { Schema } = mongoose;
const autoIncrement = mongooseSequence(mongoose);
const { NODE_ENV } = config;

//PERMISSION SCHEMA
//  ============================================
const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);
/**
 * Set the autoCreate option on models if not on production
 */
permissionSchema.set('autoCreate', NODE_ENV !== 'production');

/**
 * Increments  everytime an instances is created
 */
permissionSchema.plugin(autoIncrement, { inc_field: 'permissionId' });

/**
 * Create permission model out of permissionSchema
 */
const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
