const axios = require('axios');

function checkIndex(object, index){
    if (typeof index !== "number") { 
        throw `${index || "index"} is not a number`;
    }
    if (index > Object.keys(object).length){
        throw `${index || "index"} is greater than the length`;
    }
    if (index < 0){ 
        throw `${index || "index"} is less than 0`;
    }
}

function checkString(string){
    if (typeof string !== "string") {
        throw `${string || "string"} is not a string`;
    }
}

// const bluebird = require("bluebird");
// const Promise = bluebird.Promise;

async function getPeople(){
    const { data } = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");

    return data
}

async function getPersonById(index){
    const data = await getPeople()
    checkIndex(data, index); 

    return data[index];
}

async function lexIndex(index){
    const data = await getPeople()
    checkIndex(data, index)
    const sortedData = data.sort(
        function(a,b){
            return a.lastName.localeCompare(b.lastName);
        }
    );

    return sortedData[index].firstName + ' ' + sortedData[index].lastName;
}

async function firstNameMetrics(){
    const data = await getPeople();
    const vowels = ["a", "e", "i", "o" , "u"];
    const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
    let totalLetters = 0;
    let totalVowels = 0;
    let totalConsonants = 0;
    let longestName = data[0].firstName
    let shortestName = data[0].firstName
    data.forEach(function (arrayItem) {
        totalLetters += arrayItem.firstName.length;
        for (let letter of arrayItem.firstName.toLowerCase()){
            if (vowels.includes(letter)){
                totalVowels ++ 
            }
            if (consonants.includes(letter)){
                totalConsonants ++ 
            }
        }
        if (arrayItem.firstName.length > longestName.length){
            longestName = arrayItem.firstName
        } 
        if (arrayItem.firstName.length < shortestName.length){
            shortestName = arrayItem.firstName
        }
    });
    const metrics = {
        "totalLetters" : totalLetters,
        "totalVowels" : totalVowels,
        "totalConsonants" : totalConsonants,
        "longestName" : longestName, 
        "shortestName" : shortestName
    }

    return metrics
}

async function whereDoTheyWork(firstName, lastName){
    checkString(firstName)
    checkString(lastName)
    const people = await getPeople();
    const person = people.find(i => i.firstName == firstName && i.lastName == lastName)

    if (person !== "undefined") {
        
    }



    return person

    // }

    // const work = await axios.get("https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json");

}

async function main() {
    // x = await lexIndex(2)
    console.log(await whereDoTheyWork("Demetra", "Durrand"));
}
// function shouldTheyGoOutside(firstname, lastname){
main()
// }