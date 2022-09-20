Question 1 & 2)

this inside global scope - 

this.table = 'window table';
console.log(this.table);

this.garage = {
	table: 'garage table';
};



this inside an object - 

let johnsRoom = {
	table : 'johns table';
};

console.log(johnsRoom.table); //this.johnsRoom.table cannot be used here because we used 'let' to create the object and we know that let variables dont belong to the window object.



this inside an object method-

//Adding a cleantable() method to johnsRoom object.

let johnsRoom = {
	table : 'johns table';
	cleanTable(){
	console.log(`cleaning ${this.table}`); //this.table refers to johns table.
	}
};

//adding a cleantable() method to this.garage.

this.garage = {
	table: 'garage table';
	cleantable(){
	console.log(`cleaning ${this.table}`); //here, this.table refers to garage table.
	}
};



this inside a regular function - 

//adding a cleantable method to global object i.e. window object 

this.table = 'window table';

const cleantable = function(){
	console.log(`cleaning ${this.table}`);
}

this code above will work fine but we shouldn't use that because it can lead to errors if we use strict mode.

Instead we should use the call method:-

cleantable.call(this);



With the help of call method, we dont even have to create a separate cleantable method every time. call method allows one method to be used by multiple objects. 

e.g.

const cleantable = function(){
	console.log(`cleaning ${this.table}`);
}

cleantable.call(this); //here, this.table will refer to the window object as we passed this in the argument.
cleantable.call(this.garage);	//here, this.table will refer to the garage object
cleantable.call(johnsRoom);	//this will refer to johnsRoom object.



this inside an inner function - 

const cleantable = function(soap){

	const innerFunction = function(_soap){
	console.log(`cleaning ${this.table} using ${_soap}`);
	}
	innerFunction(soap);
};


using this.table like that can lead to errors if we use strict mode, so lets use call method to avoid that:-

this.table = 'window table';

const cleantable = function(soap){
    const innerfunction = function(_soap){
        console.log(`cleaning ${this.table} using ${_soap}`);
    }
    innerfunction(soap);
};

this.garage = {
    table : 'garage table'
};

cleantable.call(this.garage, 'some soap');

But there's a problem here, we're trying to refer to this.garage but it still prints window table instead of garage table. This is because this keyword always refers to the global object inside a regular function even if its an inner function.

We have multiple ways to fix that :-

1)

this.table = 'window table';

const cleantable = function(soap){
    that = this;
    const innerfunction = function(_soap){
        console.log(`cleaning ${that.table} using ${_soap}`);
    }
    innerfunction(soap);
};

this.garage = {
    table : 'garage table'
};

cleantable.call(this.garage, 'some soap');

Now it'll print the correct output.


2)


this.table = 'window table';

const cleantable = function(soap){
    const innerfunction = (_soap)=>{
        console.log(`cleaning ${this.table} using ${_soap}`);
    }
    innerfunction(soap);
};

this.garage = {
    table : 'garage table'
};

cleantable.call(this.garage, 'some soap');

here, we use an arrow function because in arrow functions, this keyword inside an inner function will always point to the same object as the outer function and since the outer function in this example above points to this.garage, thats why the inner function also points to that.



this inside a constructor - 

this.table = 'window table';

this.garage = {
	table: 'garage table'
};


let johnsRoom = {
	table : 'johns table'
};

let createRoom = function(name){
    this.table = `${name}s room`
}

createRoom.prototype.cleanTable = function(soap){       // we use a prototype when we want a function to be available to all the objects by default.
    console.log(`cleaning ${this.table} using ${_soap}`);
}

const jillsRoom = new createRoom("jill");
const johnsRoom = new createRoom("john");


jillsRoom.cleanTable('some soap');
johnsRoom.cleanTable('some soap');



this inside a class :-


this.table = 'window table';

this.garage = {
	table: 'garage table'
};


let johnsRoom = {
	table : 'johns table'
};

class createRoom{
    constructor(name){
        this.table = `${name}s room`
    }

    cleanTable(soap){       
        console.log(`cleaning ${this.table} using ${_soap}`);
    }

}

createRoom.prototype.cleanTable = 

const jillsRoom = new createRoom("jill");
const johnsRoom = new createRoom("john");


jillsRoom.cleanTable('some soap');
johnsRoom.cleanTable('some soap');






Question 3 to 6)

class Student{
    static count = 0;
    constructor(name, age, phone_no, marks){
        this.name = name;
        this.age = age;
        this.phone_no = phone_no;
        this.marks = marks;

        function check(){
            if(marks>=40){
                console.log(`${name} is eligibile`);
            }
            else{
                console.log(`${name} is not eligibile`);
            }
        }

        Student.count++;
        check();
    }
}

function peoplecount(){
    console.log("there are "+ Student.count + " people");
}

const student1 = new Student("hrithik", 23, 94325245, 98);
const student2 = new Student("joey", 28, 2367777, 38);
const student3 = new Student("ralph", 25, 1222233, 76);
const student4 = new Student("melissa", 22, 352523, 93);
const student5 = new Student("chelsea", 29, 4523453, 91);

peoplecount();



-------------------------------------------

let getA = a => a;

console.log(getA(1));

-------------------------------------------
let square = (a) => {return a*a};
console.log(square(2));


let multiply = (a,b) => {return a*b};

--------------------------------------------
var x = function(){
this.val = 1;

setTimeout(()=>{
this.val++;
console.log(this.val)},1)
};

---------------------------------------------

var x = function(){
console.log(arguments[0])
};


x(1,2,3);

---------------------------------------------

var x = (...n)=>{
console.log(n[0])
};


x(1,2,3);


---------------------------------------------


class Student{
    constructor(name, age, marks){
        this.name = name;
        this.age = age;
        this.marks = marks;
    }

    setPlacementAge(minAge){
          return (minMarks)=>{
            if(this.marks > minMarks && this.age > minAge){
                arr.push(this.name);
                console.log(this.name + " is eligible"); 
            }
            else{
                console.log(this.name + " is not eligibile");
            }
          }
    }
}

this.arr = [];
const hrithik = new Student('hrithik', 23, 98);
const joey = new Student('joey', 17, 45);
const ross = new Student('ross', 24, 96);
const chandler = new Student('chandler', 24, 93);
const monica = new Student('monica', 18, 84);
joey.setPlacementAge(18)(40);
hrithik.setPlacementAge(18)(40);
ross.setPlacementAge(18)(40);
chandler.setPlacementAge(18)(40);
monica.setPlacementAge(18)(40);

console.log('The eligibile students are :-');
for(let i of arr){
    console.log(i);
}


----------------------------------------------

The major difference between a regular function and an arrow function is that the 'this' keyword works differently in both. In a regular method, this always refers to the object that invoked the function. But inside an arrow function, this refers to the closest parent object.

----------------------------------------------
To understand why it was introduced, lets see an example - 

this.a = 29;
        const obj = {
            printA : function(){
                console.log(this.a);
            }
        }

        obj.printA();

In the above example, it'll print undefined because it doesn't know what this.a is because it doesn't exist inside that scope. So, we use an arrow function to refer to the parent object i.e. this.a = 29.

e.g. 

this.a = 29;
        const obj = {
            printA : ()=>{
                console.log(this.a);
            }
        }

        obj.printA();

Since, this keyword inside an arrow function refers to the closest parent object, this.a will now print 29.         


