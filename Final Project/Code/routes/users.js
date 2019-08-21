const express = require("express");
const router = express.Router();

const data = require("../data");
const users = data.users;
const posts = data.posts;

router.get('/', async (req, res) => {
    const allPosts = (await posts.getAll()).reverse();

    res.render('index', {
        users: allUsers
    });
});

router.get('/:username', async (req, res) => {
    const user_profile = await users.username(req.params.username);

    let user_posts = [];

    for (i = 0; i < user_profile.posts.length; i++) {
        user_posts.push(await posts.get(user_profile.posts[i]));
    };

    let user_likes = [];
    for (i = 0; i < user_profile.likes.length; i++) {
        user_likes.push(await posts.get(user_profile.likes[i]))
    };

    if (req.session.userId) {
        const user = await users.get(req.session.userId);
        res.render('profile/profile', {
            user: user,
            user_profile: user_profile,
            posts: user_posts,
            likes: user_likes
        });
    } else {
        res.render('profile/profile', {
            user_profile: user_profile,
            posts: user_posts,
            likes: user_likes
        });
    }

})

module.exports = router;