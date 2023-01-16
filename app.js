"use strict";
// const num1element = document.getElementById('num1') as HTMLInputElement; //as HTMLInputElement is an example of type casting i.e. we're telling the compiler that we know for sure that the value that'll be stored in here is of type HTMlInputElement. Similarly, type casting has happened below as well.
// const num2element = document.getElementById('num2') as HTMLInputElement;
// const btn = document.querySelector('button') as HTMLButtonElement; //typescript is able to infer types based on our code. 
// const numResults: number[] = []; //here, we're telling the compiler that all the items inside this array will be of type numbers.
// const stringResults: string[] = [];
// type NumOrString = number | string; //type allows us to create aliases. So instead of writing number | string everywhere, we can simply use NumOrString now.
// type Result = {val: number; timeStamp: Date}; //type also allows to create aliases for objects.
// function add(num1: NumOrString, num2: NumOrString){ // | symbol is called a pipe and number | string is called a union type, meaning that the data can be a number or a string. 
//     //writing return num1 + num2; would throw an error because typescript wants us to explicitly specify what to do when the parameters are of type number and what to do when they're a string and otherwise.
//     if(typeof num1==='number' && num2==='number'){
//         return num1+num2;
//     }
//     else if(typeof num1==='string' && typeof num2==='string'){
//         return num1+' '+num2;
//     }
//     return +num1 + +num2; //convert both to number if they're not of the same type.
// }
// btn.addEventListener('click', ()=>{
//     const num1 = num1element.value;
//     const num2 = num2element.value;
//     const result = add(+num1, +num2); //we've used + before the arguments to tell the compiler that the arguments will be of type number and not a string. We have to specify that explicitly because .value in num1element.value always returns a string so we're forced to convert it to a number using +. This is an example of the advantage of using typescript because it points out the errors beforehand.
//     const stringResult = add(num1, num2);
//     console.log(result)
//     console.log(stringResult);
//     numResults.push(result as number); //since result uses a union type, we've to specify that this is going to be a number. 
//     stringResults.push(stringResult as string);
//     printResult({val: result as number, timeStamp: new Date()}) //here, we had to use type casting because typescript doesn't know if result is always going to be a number, so we're stating it explicitly.
//     console.log(numResults, stringResults); 
// })
// function printResult(resultObj: Result){ //here, we're defining a structure for the object parameter on what the object argument should look like when this function is called. So, if the value being passed doesn't follow this format, it'll throw an error.
//     console.log(resultObj.val);
// }
// add(1, 2);
// interface ResultObj{ //we can also use an interface to set the structure of an object.
//     val: number,
//     timestamp: Date;
// }
//A generic type is simply a type that interacts with another type. for example, an array is a generic type because its a type on its own i.e. its a list of items, and secondly it interacts with another type i.e. the type of data inside the array.
const numResults = []; //this is the detailed way of declaring an array and here we can see that its a generic type because its of type array and contains elements of type number.
const mypromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('it worked!'); //this promise resolves to a string.
    }, 1000);
});
mypromise.then((result) => {
    console.log(result.split('w')); //since this promise resolves to a string, we can use string methods on result here.
});
