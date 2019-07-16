const mongoCollections = require("../config/mongoCollections");
const animals = require("./animals");
const posts = require("./posts")
const uuid = require("uuid/v4");

async function likeOne(animalID, postID){ 
    if (!animalID || !postID) throw new Error("animalID and postID need to be provided");

    const animalCollection = await animals();

    const animal = await animalCollection.findOne({
        _id: id
    });

    if (animal === null) throw "No animal with that id";

    const postCollection = await posts();
    const post = await postCollection.findOne({
        _id: id
    });

    if (post === null) throw "No post with that id";

}

async function unLikeOne(animalId, postID){

}

module.exports = {
    likeOne, 
    unlikeOne,
}