const express = require("express");
const router = express.Router();

const data = require("../data");
const users = data.users;
const posts = data.posts;

router.get('/', async(req, res) => {
    const allPosts = (await posts.getAll()).reverse();

    if(req.session.userId) { 
        const user = await users.get(req.session.userId)
        res.render('index', {
            user: user,
            posts: allPosts
        });
    } else { 
        res.render('index', {
            posts: allPosts
        });
    }
});

module.exports = router;