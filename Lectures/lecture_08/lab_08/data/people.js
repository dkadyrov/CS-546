const axios = require('axios');

async function getAll() {
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");

    return data
}

async function getOne(id) {
    if (!id) throw "ID must be provided";

    const people = await getAll();

    const person = people.find(i => i.id == id);

    if (person === undefined) {
        throw `${person || "person"} cannot be found`;
    };

    return person;
}

async function search(name) {
    if (!name || typeof (name) !== "string") throw "Name must be provided";

    const people = await getAll();

    const results = people.filter(i => i.firstName == name || i.lastName == name);

    if (results === undefined) {
        throw "No results";
    };

    return results;
}


module.exports = {
    getOne,
    getAll,
    search,
}