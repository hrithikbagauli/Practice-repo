const num1element = document.getElementById('num1') as HTMLInputElement; //as HTMLInputElement is an example of type casting i.e. we're telling the compiler that we know for sure that the value that'll be stored in here is of type HTMlInputElement. Similarly, type casting has happened below as well.
const num2element = document.getElementById('num2') as HTMLInputElement;
const btn = document.querySelector('button') as HTMLButtonElement; //typescript is able to infer types based on our code. 

function add(num1: number, num2: number){
    return num1 + num2;
}

add(1, 2);
btn.addEventListener('click', ()=>{
    const num1 = num1element.value;
    const num2 = num2element.value;
    const result = add(+num1, +num2); //we've used + before the arguments to tell the compiler that the arguments will be of type number and not a string. We have to specify that explicitly because .value in num1element.value always returns a string so we're forced to convert it to a number using +. This is an example of the advantage of using typescript because it points out the errors beforehand.
    console.log(result)
})

console.log(add(1,6));