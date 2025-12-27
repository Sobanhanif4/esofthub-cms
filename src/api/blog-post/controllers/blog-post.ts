/**
 * blog-post controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
    // Increment view count for a blog post
    async incrementView(ctx) {
        const { id } = ctx.params;

        try {
            // Find the post by ID
            const post = await strapi.entityService.findOne('api::blog-post.blog-post', id, {
                fields: ['viewCount'],
            });

            if (!post) {
                return ctx.notFound('Post not found');
            }

            // Increment the view count
            const updatedPost = await strapi.entityService.update('api::blog-post.blog-post', id, {
                data: {
                    viewCount: (post.viewCount || 0) + 1,
                },
            });

            return { viewCount: updatedPost.viewCount };
        } catch (error) {
            ctx.throw(500, error);
        }
    },
}));
