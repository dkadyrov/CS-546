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
    const user = await users.username(req.params.username);

    console.log(user)

    let user_posts = [];
    console.log(user.posts.length)

    for (i = 0; i < user.posts.length; i++) {
        user_posts.push(await posts.get(user.posts[i]));
    };

    let user_likes = [];
    for (i = 0; i < user.likes.length; i++) {
        user_likes.push(await posts.get(user.likes[i]))
    };

    res.render('profile/profile', {
        user: user,
        posts: user_posts,
        likes: user_likes
    });
})

module.exports = router;