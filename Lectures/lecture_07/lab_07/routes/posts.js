const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;

router.get("/", async (req, res) => {
    try {
        const postList = await posts.getAll();
        res.json(postList);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});

router.post("/", async (req, res) => {
    const postData = req.body;
    try {
        const {
            title,
            author,
            content
        } = postData;
        const newPost = await posts.createOne(title, author, content);

        res.json(newPost);
    } catch (e) {
        console.log(e)
        res.status(500).json({
            error: e
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await posts.getOne(req.params.id);
        res.json(post);
    } catch (e) {
        res.status(404).json({
            error: "Post not found"
        });
    }
});

router.put("/:id", async (req, res) => {
    const updatedData = req.body;
    try {
        await posts.getOne(req.params.id);
    } catch (e) {
        res.status(404).json({
            error: "Post not found"
        });
    }

    try {
        const updatedPost = await posts.update(req.params.id, updatedData);

        res.json(updatedPost);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await posts.getOne(req.params.id);
    } catch (e) {
        res.status(404).json({
            error: "Post not found"
        });
    }
    try {
        const deletedPost = await posts.getOne(req.params.id);
        const deletedData = {
            deleted: true,
            data: deletedPost
        };
        await posts.removeOne(req.params.id);
        res.json(deletedData);
    } catch (e) {
        console.log(e)
        res.status(500).json({
            error: e
        });
    }
});

module.exports = router;
