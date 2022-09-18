1)

var obj = {num:2};

var addtothis2 = function(a,b,c){
    return this.num+a+b+c;
}

console.log(addtothis2.call(obj,1,2,3));




2)

var obj = {num:2};

var addtothis2 = function(a,b,c){
    return this.num+a+b+c;
}

let arr = [1,2,3];
console.log(addtothis2.apply(obj,arr));



3)

var obj = {num:2};

var addtothis = function(a,b,c){
    return this.num+a+b+c;
}

var bound = addtothis.bind(obj);
console.log(bound(1,2,3));



4)

const student = {age:20};
const ageprinter = function(){
    return this.age;
}

const newfunction = ageprinter.bind(student);
console.log(newfunction());


const multiply = function(x,y){
    return x*y;
}

const multiplybytwo = multiply.bind(this,2);
console.log(multiplybytwo(4));

5)

const multiply = function(x){
    return function(y){
        console.log(x*y);
    }
}

const multiplybytwo = multiply(2);
multiplybytwo(13);