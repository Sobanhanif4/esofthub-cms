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
    const categories = ['Strategic Vision', 'Engineering', 'Impact'];

    for (const categoryName of categories) {
      const existingCategory = await strapi.documents('api::category.category').findMany({
        filters: { name: categoryName },
      });

      if (existingCategory.length === 0) {
        await strapi.documents('api::category.category').create({
          data: {
            name: categoryName,
          },
        });
        strapi.log.info(`Created category: ${categoryName}`);
      }
    }
  },
};
