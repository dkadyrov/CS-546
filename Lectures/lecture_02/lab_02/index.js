const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils.js');
const objUtils = require('./objUtils.js')

// Remove test 
try { 
    const removeOne = arrayUtils.remove(numArray, 3);
    console.log('head passed successfully');
} catch(e) { 
    console.error('remove failed test case')
}
try {
    // Should Fail
    const removeTwo = arrayUtils.remove(1234);
    console.log(removeTwo)
    console.error('remove did not error');
} catch (e) {
    console.log('remove failed successfully');
}

// countElements
try {
    const countOne = arrayUtils.countElements(numArray);
    console.log('head passed successfully');
} catch (e) {
    console.error('remove failed test case')
}
try {
    // Should Fail
    const countTwo = arrayUtils.countElements(1234);
    console.error('remove did not error');
} catch (e) {
    console.log('remove failed successfully');
}

// capitalize
try {
    const capitalizeOne = stringUtils.capitalize("daniel");
    console.log('head passed successfully');
} catch (e) {
    console.error('remove failed test case')
}
try {
    // Should Fail
    const capitalizeTwo = stringUtils.capitalize(1234);
    console.error('remove did not error');
} catch (e) {
    console.log('remove failed successfully');
}

// countChars
try {
    let countCharsOne = stringUtils.countChars("I declare bankrupsy!");
    console.log('countChars passed successfully');
} catch (e) {
    console.error('countChars failed test case')
}
try {
    // Should Fail
    const countCharsTwo = arrayUtils.countChars(123);
    console.error('remove did not error');
} catch (e) {
    console.log('countChars failed successfully');
}

// extend 
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

try {
    let countCharsOne = stringUtils.countChars("I declare bankrupsy!");
    console.log('countChars passed successfully');
} catch (e) {
    console.error('countChars failed test case')
}
try {
    // Should Fail
    const countCharsTwo = arrayUtils.countChars(123);
    console.error('remove did not error');
} catch (e) {
    console.log('countChars failed successfully');
}