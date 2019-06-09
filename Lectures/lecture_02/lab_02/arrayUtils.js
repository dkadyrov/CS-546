function arrayCheck(array) {
    if (!Array.isArray(array)) {
        throw `${array || "provided array"} is not an array`;
    } else if (array.length == 0) {
        throw `${array || "provided array"} is empty`;
    }
}

module.exports = {
    description: "This are array utility functions",
    head: (array) => {
        arrayCheck(array);
        // Returns the first element of an array.
        return array[0];
    },

    tail(array) {
        // Returns the last element of an array.
        arrayCheck(array);
        return array[array.length-1];
    },

    remove(array, index) {
        arrayCheck(array);
        if (index < 0 || index > array.length()){
            throw ``
        }
        array = array.splice(index,1);
        
        return array;
    },

    range(end, value) {
        var array = []
        var i;
        if (end <= 0){
            throw ``
        }

        if (value === undefined) {
            for (i = 0; i < end; i++) {
                array.push(i);
            }
        }
        else {
            for (i = 0; i < end; i++) {
                array.push(value);
            }
        }

        return array;
    }
};