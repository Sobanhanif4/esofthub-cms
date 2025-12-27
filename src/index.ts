// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // 1. AUTOMATIC PERMISSION FIX: This unlocks the blogs for the website without needing the Admin UI
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const permissionsToGrant = [
          { action: 'api::blog-post.blog-post.find' },
          { action: 'api::blog-post.blog-post.findOne' },
          { action: 'api::category.category.find' },
          { action: 'api::category.category.findOne' },
        ];

        for (const perm of permissionsToGrant) {
          const existing = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { role: publicRole.id, action: perm.action },
          });

          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: perm.action,
                role: publicRole.id,
              },
            });
            strapi.log.info(`Granted permission: ${perm.action}`);
          }
        }
      }
    } catch (err) {
      strapi.log.error('Failed to set public permissions automatically:', err);
    }

    // Temporarily disabled to prevent crash: Cannot read properties of undefined (reading 'attributes')
    /*
    const categories = ['Strategic Vision', 'Engineering', 'Impact'];
    ...
    */
  },
};
