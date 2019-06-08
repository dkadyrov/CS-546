function head(array) {
    // Returns the first element of an array.
    if (!Array.isArray(array)) {
        throw `${array || "provided array"} is not an array`;
    }

    else if (array.length == 0) {
        return
    }
    
    else {
        return array[0];
    }

function tail(array) {

    return array[-1];
}

function remove(array, index) {

    return array;
}

function range(array, index) {

    return array;
}