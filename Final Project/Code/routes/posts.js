const express = require("express")
const router = express.Router()
const posts = require("../data/posts")
const users = require("../data/users")

// router.use(function (request, response, next) {
//     if (request.session.loggedin === true) {
//         next();
//     } else {
//         response.redirect('/')
//     }
// });

router.get("/", async(req, res) => {
    const allPosts = await posts.getAll();

    res.render("posts/posts", {
        posts: allPosts
    });
});

router.get("/:id", async(req, res) => {
    const post = await posts.get(req.params.id);

    res.render("posts/post", {
        post: post
    });
})

router.get("/create", async (req, res) => {
    if (req.session.loggedin === true) {
        const user = await users.get(req.session.userId)
        res.render("posts/create", {
            user: user
        });
    } else {
        response.redirect("posts")
    }
});

router.post("/create", async (req, res) => {
    console.log(req.body)

    const user = await users.get(req.session.userId)

    const data = { 
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        url: req.body.url
    }

    try {
        await posts.create(data, user)
        res.redirect("/")
    } catch(e) {
        console.log(e)
        res.status(500).render("posts/post", {
            error: e.toString()
        });
        return
    };
});

module.exports = router