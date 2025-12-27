export default {
    routes: [
        {
            method: 'POST',
            path: '/blog-posts/:id/increment-view',
            handler: 'blog-post.incrementView',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
