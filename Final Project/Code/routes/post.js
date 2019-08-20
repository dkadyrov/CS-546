const express = require("express")
const router = express.Router()
const users = require("../data/users")
const posts = require("../data/posts")


router.use(function (request, response, next) {
    if (request.session.loggedin === true) {
        next();
    } else {
        response.redirect('/')
    }
});

router.get("/", async (req, res) => {
    res.render("post/post");
})

router.post("/", async (req, res) => {
    console.log(req.body)

    // let user;
    // try {
    //     user = await users.create(req.body);

    //     req.session.userId = user._id;
    //     req.session.loggedin = true;

    //     res.redirect("/");
    // } catch (e) {
    //     res.status(500).render("register/register", {
    //         error: e.toString()
    //     });
    //     return
    // };
})

module.exports = router