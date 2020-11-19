const evens = [2, 4, 6, 8];
const numbers = [1, 3, 5, 7, ...evens];
console.log(numbers); // expected output: [1, 3, 5, 7, 2, 4, 6, 8]
// concatenating two arrays
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];

arr1 = [...arr1, ...arr2];

var num = 5;
var nums = [5,6];