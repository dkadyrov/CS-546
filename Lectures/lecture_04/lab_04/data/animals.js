const collections = require("./collections");
const animals = collections.animals;

async function get(id) {
    if (!id) throw "ID must be provided";

    const animalCollection = await animals();
    const animal = await animalCollection.findOne({
        _id: id
    });

    if (animal === null) throw "No animal with that id";

    return animal
}

async function create(name, animalType) {
    if (!name || typeof (name) !== "string") throw "Name must be provided and in string type";
    if (!animalType || typeof (animalType) !== "string") throw "animalType must be provided and in string type";

    const animalCollection = await animals();

    let newAnimal = {
        name: name,
        animalType: animalType
    };

    const insertInfo = await animalCollection.insertOne(newAnimal);

    if (insertInfo.insertedCount === 0) throw "Could not add animal";

    const newId = insertInfo.insertedId;

    const animal = await this.get(newId);

    return animal
}

async function getAll() {
    const animalCollection = await animals();

    const allAnimals = await animalCollection.find({}).toArray();

    return allAnimals
}

async function remove(id) {
    if (!id) throw "ID must be provided";

    const animalCollection = await animals();

    const deletionInfo = await animalCollection.deleteOne({
        _id: id
    });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete animal with id of ${id}`;
    }
}

async function rename(id, newName) {
    if (!id) throw "ID must be provided"
    if (!newName || typeof (newName) !== "string") throw "newName must be provided and in string form"

    const animalCollection = await animals();

    const updatedAnimal = {
        $set: {name: newName},
    };

    const updatedInfo = await animalCollection.updateOne({
        _id: id
    }, updatedAnimal);

    if (updatedInfo.modifiedCount == 0) {
        throw "could not update animal successfully";
    }

    return await this.get(id);

}

module.exports = {
    get,
    create,
    getAll,
    remove,
    rename,
}