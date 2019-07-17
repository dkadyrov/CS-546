const collections = require("./collections");
const posts = collections.posts;
const animals = require("./animals");

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

    const postCollection = await animals();
    const post = await postCollection.findOne({
        _id: id
    });

    if (post === null) throw "No post with that id";

    return post
}

async function createOne(title, author, content){
    const animalCollection = await animals();

    const animal = animalCollection.getOne(author._id)

    const postCollection = await posts();

    let newPost = {
        title: title,
        content: content,
        author: {
            _id: animal._id, 
            name: animal.name
        }
    }

    const insertInfo = await postCollection.insertOne(newPost);

    if (insertInfo.insertedCount === 0) throw new Error ("Could not add post");

    const newID = insertInfo.insertedId

    const post = await this.get(newID)

    return post
}

async function removeOne(id) { 
    if (!id) throw new Error("ID must be provided");

    if (typeof (id) !== Object) {
        id = sanitizeID(id)
    }

    const postCollection = await posts();

    const deletionInfo = await postCollection.deleteOne({
        _id: id
    });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete post with id of ${id}`;
    }
}

async function updateOne(id, data){ 
    const postCollection = await posts();

    const updatePostData = {};

    if (data.title) { 
        updatePostData.title = data.title;
    };
    if (data.content) {
        updatePostData.content = data.content;
    };

    let updateCommand = {
        $set: updatePostData
    };

    const query = {
        _id: id
    };

    await postCollection.updateOne(query, updateCommand)

    if (updateCommand.modifiedCount == 0) {
        throw new Error("Could not update animal successfully");
    };

    return await this.getOne(id)
}

module.exports = {
    createOne,
    getOne,
    removeOne,
    updateOne
}