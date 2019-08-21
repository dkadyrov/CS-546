const express = require("express");
const router = express.Router();
const users = require("../data/users");
const posts = require("../data/posts");

router.post("/", async(req, res) => {

    try {
        const results = await posts.search(req.body.search)

        if (req.session.userId) {
            const user = await users.get(req.session.userId)
            res.render("posts/results", {
                        user: user,
                        posts: results
                    });
        } else {
            res.render("posts/results", {
                posts: results
            });
        }
    } catch (e) {
        console.log(e)
        res.status(404).render("posts/results", {
            error: e.toString()
        });
        return
    };

});

module.exports = router;