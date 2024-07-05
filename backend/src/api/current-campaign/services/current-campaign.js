'use strict';

/**
 * current-campaign service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::current-campaign.current-campaign');
