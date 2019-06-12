const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils.js');

let numArray = [1,2,3,4,5,10,100];
let stringArray = ["I", "Declare", "Bankrupsy"];
let mixArray = ["Jenny", "8", "675", "309"];
let empty = [''];

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


