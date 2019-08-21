const collections = require("./collections");
const utils = require("../utils/utils");
const posts = collections.posts;
const users = collections.users;
 
async function get(id) { 
    if (!id) {
        throw ("Error: id was not defined")
    }

    if (typeof(id) !== Object){
        id = utils.sanitizeID(id)
    }

    const postCollection = await posts()

    const post = await postCollection.findOne({
            _id: id
        })
    
    if (post === null) throw "No post with that id";

    return post
}

async function getAll() {
    const postsCollection = await posts();

    const allPosts = await postsCollection.find({}).toArray();

    return allPosts
}

async function create(data, author) {
    const postCollection = await posts();

    const post = {
        title: data.title, 
        author: {
            _id: author._id,
            username: author.username,
            picture: author.picture
        },
        content: data.content,
        type: data.type,
        url: data.url
    };

    const insertInfo = await postCollection.insertOne(post);

    if (insertInfo.insertedCount === 0){
        throw new Error("Could not add post");
    }

    const newId = insertInfo.insertedId;

    const checkPost = await this.get(newId);

    let userCollection = await users()

    userCollection.updateOne({
        _id: author._id
    }, {
        $addToSet: {
            posts: checkPost._id
        }
    })

    return checkPost
};

async function update(id, data) { 
    if (!id) throw new Error("ID must be provided");

    if (typeof (id) !== Object) {
        id = utils.sanitizeID(id)
    };

    const postCollection = await posts();

    const updatedPost = {
        $set: data,
    };

    await postCollection.updateOne({
        _id: id
    }, updatedPost);

    const post = await this.get(id)

    return post;
};

async function remove(id) {
    if (!id) throw new Error("ID must be provided");

    if (typeof (id) !== Object) {
        id = utils.sanitizeID(id)
    };

    const postCollection = await posts();

    const post = await this.get(id)

    let userCollection = await users()
    await userCollection.updateOne({
        _id: post.author
    }, {
        $pull: {
            posts: post._id
        }
    })

    const deletion = await postCollection.deleteOne({
        _id: id
    });

    if (deletion.deletedCount === 0) {
        throw `Could not delete post with id of ${id}`;
    };

    return {
        "deleted": true,
        "data": post
    };
};

async function search(text) { 
    const query = text.toLowerCase(); 

    const posts = await this.getAll()

    let results = [];

    for(let i=0; i<posts.length; i++) {
        if (posts[i].title.toLowerCase().includes(query) || posts[i].content.toLowerCase().includes(query)) { 
            results.push(posts[i])
        }
    };

    return results
};

module.exports = { 
    get,
    getAll,
    create,
    update,
    remove,
    search
}