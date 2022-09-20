1)

first, when the program runs, a global execution context is created in the call stack. Then, the lines of code are executed. When javascript comes across a function that is not part of javascript, it uses the window object to get the particular API and stores the callback function in the web API area. In case of a setTimeout method, the web API also starts the timer with mentioned time and in case of a fetch method, the web API stores the callback and waits for the response for the fetch command. When the timer finishes counting or if the response comes for the fetch command, these callback functions are pushed into the callback queue or microtask queue where functions inside microtask queue hold a higher priority than callback queue. Infact, callback queue cannot push any function into the call stack until the microtask queue is empty and this even leads to starvation of functions in callback queue.

Javascript doesn't wait for these processes to finish and continues on to the next line of code. In case of functions, new execution contexts are created and when the function finishes executing, its popped from the call stack. Finally, when there's nothing left in the global scope to execute, its popped from the call stack as well. The event loop always keeps track of the call stack, callback queue and microtask queue. If the call stack becomes empty, then it pushes the function inside the callback queue to the call stack. The event loop also checks if there's anything in the microtask queue and if there is, that is pushed into the call stack first.


2)

Global execution context is removed from the stack when there are no lines of code left to execute.


3)

when DOM methods are used, the DOM API is called which goes into the document object model searches for the specified object and returns it. If there's a callback function, its stored in the web API space and depending on what type of method we've used, its pushed into the callback queue or microtask queue. For example, in case of an eventlistener method, the callback will get stored in the web API area and the type of event will be attached to it as well. The callback function stays in the web API area waiting for the even to be triggered. It doesn't get deleted unless its explicitly removed from the code or the browser is closed. 
As soon as the event is triggered, the callback function is pushed into the callback queue and if the call stack is empty, the event loop removes the callback function from the queue and pushes it into the call stack where it is executed immediately and popped after execution completes.


4)

callback queue is needed in order to keep track of all the callback functions because there can be multiple callback functions, for example, if there are multiple setTimeout() methods and if there was no callback queue then the event loop will not know which callback function to push into the stack first.


5)

when javascript comes across the fetch command, the callback function is put in the web API environment and the fetch API is called, which sends the data to the mentioned server and waits for a response. 
As soon as the fetch API gets the response, it pushes the callback function into the microtask queue because it uses promises. 
Since mircotask queue has a higher priority, all the callback functions inside it will be pushed in the call stack first(if the call stack is empty) one by one and the callback functions inside the callback queue will have to wait.


6)

microtask queue is very similar to callback queue. It has a higher priority than the callback queue so the functions inside this queue will be pushed into the call stack first. All the callback functions that come back using promises or callback functions that come back through mutation observer are put into the microtask queue. Everything else goes into the callback queue or task queue.


7)

Since the microtask queue has a higher priority and the callback queue has to wait for the microtask queue to become empty, it might happen that the functions inside the callback queue will never get a chance to execute and this is called starvation of the function inside callback queue.


8)

callback queue is used because the order of the callback functions must be kept so that the event loop knows which callback function to push into the call stack next. Since queues follow a first in first out structure, we use a callback queue so that the callback function that comes first will be pushed first into the queue first will be pushed into the call stack first. We cannot use a stack because stacks follow a last in first out structure which is not useful in this case.

9)

event loop handles async code by putting the callback functions into callback queue or the microtask queue. The event loop monitors the call stack and both the queues to see if the call stack has become empty and if there are any functions inside the queues, it then pushes the function into the call stack where the function is executed immediately. e.g. in case of a setTimeout() the callback function is put into the web API environment and the timer is started. As soon as the timer runs out, the callback function is pushed into the callback queue.