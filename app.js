var num1element = document.getElementById('num1'); //as HTMLInputElement is an example of type casting i.e. we're telling the compiler that we know for sure that the value that'll be stored in here is of type HTMlInputElement. Similarly, type casting has happened below as well.
var num2element = document.getElementById('num2');
var btn = document.querySelector('button'); //typescript is able to infer types based on our code. 
function add(num1, num2) {
    //writing return num1 + num2; would throw an error because typescript wants us to explicitly specify what to do when the parameters are of type number and what to do when they're a string and otherwise.
    if (typeof num1 === 'number' && num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2; //convert both to number if they're not of the same type.
}
add(1, 2);
btn.addEventListener('click', function () {
    var num1 = num1element.value;
    var num2 = num2element.value;
    var result = add(+num1, +num2); //we've used + before the arguments to tell the compiler that the arguments will be of type number and not a string. We have to specify that explicitly because .value in num1element.value always returns a string so we're forced to convert it to a number using +. This is an example of the advantage of using typescript because it points out the errors beforehand.
    var stringResult = add(num1, num2);
    console.log(result);
});
console.log(add(1, 6));
