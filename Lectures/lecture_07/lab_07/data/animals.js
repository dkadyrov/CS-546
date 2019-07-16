const collections = require("./collections");
const animals = collections.animals;
const ObjectID = require('mongodb').ObjectID

function sanitizeID(id) {
    if (typeof id === "string") {
        return ObjectID(id);
    }
    return id;
}

async function getOne(id) {
    if (!id) throw new Error("ID must be provided");

    if (typeof (id) !== Object) {
        id = sanitizeID(id)
    }

    const animalCollection = await animals();
    const animal = await animalCollection.findOne({
        _id: id
    });

    if (animal === null) throw "No animal with that id";

    return animal
}

async function getAll() {
    const animalCollection = await animals();

    const allAnimals = await animalCollection.find({}).toArray();

    return allAnimals
}

async function createOne(name, animalType) {
    if (!name || typeof (name) !== "string") throw new Error("Name must be provided and in string type");
    if (!animalType || typeof (animalType) !== "string") throw new Error("animalType must be provided and in string type");

    const animalCollection = await animals();

    let newAnimal = {
        name: name,
        animalType: animalType,
        likes: []
    };

    const insertInfo = await animalCollection.insertOne(newAnimal);

    if (insertInfo.insertedCount === 0) throw new Error("Could not add animal");

    const newId = insertInfo.insertedId;

    const animal = await this.get(newId);

    return animal
}

async function removeOne(id) {
    if (!id) throw new Error("ID must be provided");

    if (typeof (id) !== Object) {
        id = sanitizeID(id)
    }

    const animalCollection = await animals();

    const deletionInfo = await animalCollection.deleteOne({
        _id: id
    });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete animal with id of ${id}`;
    }
}

async function updateOne(id, updateData) {
    if (!id) throw new Error("ID must be provided");

    if (typeof (id) !== Object) {
        id = sanitizeID(id)
    }

    if (!updateData || typeof (updateData) !== "object") throw new Error("Data must be provided and in object form");

    if (!updateData.name || typeof (updateData.name) !== "string") throw new Error("Name must be provided and in string form");

    if (!updateData.type || typeof (updateData.type) !== "string") throw new Error("Type must be provided and in string form");

    let update = {
        name: updateData.name,
        type: updateData.type
    };

    const animalCollection = await animals();

    const updatedAnimal = {
        $set: update,
    };

    const updatedInfo = await animalCollection.updateOne({
        _id: id
    }, updatedAnimal);

    if (updatedInfo.modifiedCount == 0) {
        throw new Error("Could not update animal successfully");
    };

    return await this.get(id);
};

async function addPost(id, postId, postTitle) {
    return this.getOne(id).then(currentAnimal => {
        return animals.updateOne({
            _id: id
        }, {
            $addToSet: {
                posts: {
                    id: postId,
                    title: postTitle
                }
            }
        });
    });
};

async function removePost(id, postId) {
    return this.get(id).then(currentAnimal => {
        return animals.updateOne({
            _id: id
        }, {
            $pull: {
                posts: {
                    id: postId
                }
            }
        });
    });
};

module.exports = {
    getOne,
    getAll,
    createOne,
    removeOne,
    updateOne,
    addPost,
    removePost,
}