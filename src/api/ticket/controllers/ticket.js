'use strict';

/**
 * ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', ({strapi}) => ({
    async createMultipleTickets(ctx) {
        console.log('exists')
        try {
            console.log(ctx.request.body)
            const entry = await strapi.db.query('api::ticket.ticket').create({
                data: ctx.request.body
            });

            console.log('entry ', entry)
            ctx.body = 'ok';
        } catch (err) {
          ctx.body = err;
        }
      },
}));
