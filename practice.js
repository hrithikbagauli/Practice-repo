1)

a
b
d
c

c will get printed last because its inside a callback function. The call back function will be put inside the callback queue after the timer runs out but the event loop only pushes the function into the call stack when its empty, so first everything will be executed and the global execution context will be deleted and then finally event loop will push the callback function into the call stack and it'll be executed and c will be printed.


2)

a
b
d
c


Same reason as above.
c will get printed last because its inside a callback function. The call back function will be put inside the callback queue after the timer runs out but the event loop only pushes the function into the call stack when its empty so the delay time mentioned in the setTimeout doesn't matter, so first everything will be executed and the global execution context will be deleted and then finally event loop will push the callback function into the call stack and it'll be executed and c will be printed. 


3)

a
b
d
c
e

same reason as above. Since the timer runs out faster for 'c' it'll be pushed into the callback queue first and then the timer will run out for 'e' and then it'll be pushed into the callback queue and since queues work on FIFO basis. The event loop will push the function for 'c' into the call stack first so c will get printed before e.


4)

spread operator is used to copy the values of an object to another object in such a way that if the values are changed in the second object, the values of the first object are not affected. We can also add values to the new object easily. Another use of it is that we can copy arrays and find their union easily using spread operator.

e.g. 

const obj1 = {key1: 'one', key2: 'two'};
const obj2 = obj1;

obj2.key2 = 'three';

console.log(obj1)

In this example, obj2 simply points to the reference of obj1 so changing the values in obj2 also changed the value for obj1 which is not what we want. 

so we use spread operator to fix this:-

const obj1 = {key1: 'one', key2: 'two'};

const obj2 = {...obj1};
obj2.key2 = 'four';

console.log(obj1)

spread operator creates a new object in the memory so when we change the values in the second object, it doesn't affect the first object.


finding union of two arrays using spread operator - 

arr1 = [1,2];
arr2 = [3,4];

arr3 = [...arr1, ...arr2];
console.log(arr3)