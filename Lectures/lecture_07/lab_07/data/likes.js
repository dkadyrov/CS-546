// const mongoCollections = require("./collections");
const animals = require("./animals");
const posts = require("./posts")

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

    animal.likes.push({
        _id: post._id, 
        title: post.title
    })
}

async function unLikeOne(animalId, postID){
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

    for (var i=0; i<animal.likes.length; i++){
        if (animals.likes[i]._id === postID) {
            animals.likes.splice(i, 1);
        }
    }
}

module.exports = {
    likeOne, 
    unlikeOne,
}