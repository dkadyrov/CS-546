const express = require("express");
const router = express.Router();
const animals = require("../data/animals")
// const data = require("../data");
// const aboutData = data.about;

router.get("/", async (req, res) => {
    try {
        const about = await require('../data/about.json');
        res.json(about);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await animals.get(req.params.id);
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
        await animals.get(req.params.id);
    } catch (e) {
        res.status(404).json({
            error: "Animal not found"
        });
    }

    try {
        const updatedPost = await animals.rename(req.params.id, updatedData);
        res.json(updatedPost);
    } catch (e) {
        res.status(404).json({
            error: e
        });
    }
});

module.exports = router;
