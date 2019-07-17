const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const animals = require("../data/animals");


// const data = require("../data");
// const aboutData = data.about;



router.get("/", async (req, res) => {
    try {
        const animalList = await animals.getAll;
        res.json(animalList);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    const animalInfo = req.body;

    if (!animalInfo) {
        res.status(400).json({
            error: "You must provide data to create a user"
        });
        return;
    }

    if (!userInfo.name) {
        res.status(400).json({
            error: "You must provide a name"
        });
        return;
    }

    if (!userInfo.animalType) {
        res.status(400).json({
            error: "You must provide an animal type"
        });
        return;
    }

    try {
        const newAnimal = await animals.createOne(
            userInfo.name,
            userInfo.animalType
        );
        res.json(newAnimal);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const animalList = await animals.getOne(req.params.id);
        res.json(animalList);
    } catch (e) {
        res.sendStatus(404);
    }
});

module.exports = router;
