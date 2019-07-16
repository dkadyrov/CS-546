const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const animals = require("./animals");
const uuid = require("uuid/v4");


async function getAll() {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
}

async function getOneByTag(tag){
    if (!tag) throw "No tag provided";

    const postCollection = await posts();
    return await postCollection.find({
        tags: tag
    }).toArray();
}

async function getOne(id) {
    const postCollection = await posts();
    const post = await postCollection.findOne({
        _id: id
    });

    if (!post) throw "Post not found";
    return post;
}

async function createOne(title, content, posterId) {
    if (typeof title !== "string") throw "No title provided";
    if (typeof body !== "string") throw "I aint got nobody!";

    if (!Array.isArray(tags)) {
        tags = [];
    }

    const postCollection = await posts();

    const animalThatPosted = await animals.getUserById(posterId);

    const newPost = {
        _id: uuid(),
        title: title,
        author: animalThatPosted._id,
        content: content
    };

    const newInsertInformation = await postCollection.insertOne(newPost);
    const newId = newInsertInformation.insertedId;
    return await this.getOne(newId);
}

async function removeOne(id) {
    const postCollection = await posts();
    const deletionInfo = await postCollection.removeOne({
        _id: id
    });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete post with id of ${id}`;
    }
}

async function updateOne(id, updatedPost) {
    const postCollection = await posts();

    const updatedPostData = {};

    if (updatedPost.tags) {
        updatedPostData.tags = updatedPost.tags;
    }

    if (updatedPost.title) {
        updatedPostData.title = updatedPost.title;
    }

    if (updatedPost.body) {
        updatedPostData.body = updatedPost.body;
    }

    let updateCommand = {
        $set: updatedPostData
    };
    const query = {
        _id: id
    };
    await postCollection.updateOne(query, updateCommand);

    return await this.getPostById(id);
}

async function updateTag(oldTag, newTag) {
    let findDocuments = {
        tags: oldTag
    };

    let firstUpdate = {
        $pull: oldTag
    };

    let secondUpdate = {
        $addToSet: newTag
    };

    const postCollection = await posts();
    await postCollection.updateMany(findDocuments, firstUpdate);
    await postCollection.updateMany(findDocuments, secondUpdate);

    return await this.getPostsByTag(newTag);
}

module.exports = {
    getOne,
    getOneByTag,
    getAll,
    createOne,
    updateOne,
    updateTag
}