const express = require("express");
const router = express.Router();
const data = require("../data");
const animals = data.animals;

router.get("/", async (req, res) => {
    try {
        const animalList = await animals.getAll();
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

    if (!animalInfo.name) {
        res.status(400).json({
            error: "You must provide a name"
        });
        return;
    }

    if (!animalInfo.animalType) {
        res.status(400).json({
            error: "You must provide an animal type"
        });
        return;
    }

    try {
        const newAnimal = await animals.createOne(
            animalInfo.name,
            animalInfo.animalType
        );
        res.status(200).json(newAnimal);
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

router.put("/:id", async (req, res) => {
    const animalInfo = req.body;
    if (!animalInfo) {
        res.status(400).json({
            error: "You must provide data to update a user"
        });
        return;
    }

    if (!animalInfo.newName) {
        res.status(400).json({
            error: "You must provide a name"
        });
        return;
    }

    if (!animalInfo.newType) {
        res.status(400).json({
            error: "You must provide an animal type"
        });
        return;
    }

    try {
        await animals.getOne(req.params.id);
    } catch (e) {
        res.status(404).json({
            error: "User not found"
        });
        return;
    }

    try {
        const newData = {
            name: animalInfo.newName,
            animalType: animalInfo.newType
        };

        const updatedAnimal = await animals.update(req.params.id, newData);
        res.json(updatedAnimal);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await animals.getOne(req.params.id);
    } catch (e) {
        res.status(404).json({
            error: "Animal not found"
        });
        return;
    }

    try {
        const deletedAnimal = await animals.getOne(req.params.id);
        const deletedData = {
            deleted: true,
            data: deletedAnimal
        };
        await animals.removeOne(req.params.id);
        res.json(deletedData);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
        return;
    }
});


module.exports = router;
