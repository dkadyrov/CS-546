function checkObject(object){ 
    // Check if variable is object
    if (typeof object!=="object") { 
        throw `${object || "provided variable"} is not an object`;
    }
    // check if variable


}


function extend(...args) { 
    // This method will take the properties from earlier objects in the array `args`, and compose a new object with the combined property from all the entries **without** overwriting properties from earlier entries.
    // console.log(args)
    for (let i of args) { 

    }

    let object = Object.assign({}, ...args.reverse())
    // for (let i of args.reverse()) { 
    //     object = Object.assign({}, i);
    // }

    return object
}

const first = {
    x: 2,
    y: 3
};
const second = {
    a: 70,
    x: 4,
    z: 5
};
const third = {
    x: 0,
    y: 9,
    q: 10
};

const firstSecondThird = extend(first, second, third);
console.log(firstSecondThird)

const secondThird = extend(second, third);
console.log(secondThird)

const thirdFirstSecond = extend(third, first, second);
console.log(thirdFirstSecond)
