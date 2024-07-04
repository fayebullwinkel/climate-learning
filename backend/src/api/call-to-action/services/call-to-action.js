'use strict';

/**
 * call-to-action service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::call-to-action.call-to-action');
