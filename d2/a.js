//aritmetic operations

var daily = 4;
var semester = 17;
var weekDays = 7;

function countCodingHours() {
    var totalCoding = dailyCode * weekDays * semester;
    return totalCoding;
}

var workHoursWeekly = daily * weekDays;

function countPercentageOfCoding() {
    var percentageOfCoding = countCodingHours() / workHoursWeekly;
    return percentageOfCoding;
}

console.log(countSpentTime() + ' hours spent with coding');
console.log('percentage of the coding hours: ' + countPercentageOfCoding());


///////////////////////////////////////////

function printsFizzBuzz() {
    for (var i = 1; i < 101; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
        console.log('FizzBuzz')
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
}

printsFizzBuzz();

//////////////////////////////////////////

function printsEvenNumbers () {
    for (var i = 2; i < 500; i += 2) {
        console.log(i);
    }
}

printsEvenNumbers();

////////////////////////////////////////

function operations() {
    var num1 = 22;
    var num2 = 13;
    console.log(num1 + num2);
    console.log(num2 - num1);
    console.log(num2 * num1);
    console.log(num2 / num1);
    console.log(num1 % num2);
}

operations();