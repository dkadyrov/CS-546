const arrayUtils = require('./arrayUtils');
// import { head } from './arrayUtils.js';


const headOne = arrayUtils.head([1,2,34]);
// console.log(headOne)
const tailOne = arrayUtils.tail([1,2,3,4]);
const tailTwo = arrayUtils.tail([1]);
console.log(tailTwo)

// try {
//     // Should Pass
//     const headOne = arrayUtils.head([2, 3, 4]);
//     console.log('head passed successfully');
// } catch (e) {
//     console.error('head failed test case');
// }
// try {
//     // Should Fail
//     const headTwo = head(1234);
//     console.error('head did not error');
// } catch (e) {
//     console.log('head failed successfully');
// }