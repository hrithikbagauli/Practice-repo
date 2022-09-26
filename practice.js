// console.log('person1: shows ticket');
// console.log('person2: shows ticket');

// const promiseWifeBringingTickets = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve('ticket');
//     }, 3000);
// })


// const getPopcorn = promiseWifeBringingTickets.then((t)=>{
//     console.log('wife: i have the tickets');
//     console.log('husband: we should go in');
//     console.log('wife: no i am hungry');
//     return new Promise((resolve, reject) => resolve(`${t} popcorn`))
// });

// const getButter = getPopcorn.then((t)=>{
//     console.log('husband: i got some popcorn');
//     console.log('wife: we should go in');
//     console.log('wife: i need butter on my popcorn');
//     return new Promise((resolve, reject) => resolve(`${t} butter`))
// });

// const getColdDrinks = getButter.then((t)=>{
//     console.log('husband: i got some butter');
//     console.log('wife: lets get something to drink as well');
//     return new Promise((resolve, reject) => resolve(`${t} cold drinks`))    
// });

// getColdDrinks.then((t)=>{
//     console.log(t);
// })

// console.log('person4: shows ticket');
// console.log('person5: shows ticket');







// console.log('person1: shows ticket');
// console.log('person2: shows ticket');

// const preMovie = async()=>{

//     const promiseWifeBringingTickets = new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             resolve('tickets');
//         }, 3000);
//     })

//     const getPopcorn = new Promise((resolve, reject)=> resolve('popcorn'));
//     const getButter = new Promise((resolve, reject)=> resolve('butter'));
//     const getColdDrinks = new Promise((resolve, reject)=> resolve('cold drinks'));

//     let ticket = await promiseWifeBringingTickets;

//     console.log(`wife: i have the ${ticket}`);
//     console.log('husband: we should go in');
//     console.log(`wife: no i am hungry`);

//     let popcorn = await getPopcorn;

//     console.log(`husband: i got some ${popcorn}`);
//     console.log('husband: we should go in');
//     console.log('wife: i need butter on my popcorn');

//     let butter = await getButter;

//     console.log(`husband: i got some ${butter}`);

//     let colddrink = await getColdDrinks;

//     console.log(`husband: i got the ${colddrink}`);
//     console.log(`husband: anything else?`);
//     console.log(`wife: lets go, we're getting late`);
//     console.log(`husband: thanks for the reminder -_-`);

//     return ticket;
// }

// preMovie().then((t)=>console.log('person3: shows the '+t));

// console.log('person4: shows ticket');
// console.log('person5: shows ticket');


// const posts = [{title: 'post one', body: 'this is post one'}, {title: 'post two', body: 'this is post two'}];

// const myfunc = async ()=>{
//     function displayPosts(){
//         let output = '';
//         posts.forEach((post)=>{
//             output = output + `<li> ${post.title} </li>`;
//         })
//         document.body.innerHTML = output;
//     }
    
//     function createPost(post){
//         return new Promise((resolve, reject)=>{
//             setTimeout(() => {
//                 if(posts.push(post)){
//                     resolve();
//                 }
//                 else{
//                     reject();
//                 }
//             }, 1000);
//         });
//     }
    
//     function deletePost(){
//         return new Promise((resolve, reject)=>{
//             setTimeout(() => {
//                 if(posts.pop())
//                     resolve();
//                 else{
//                     reject();
//                 }
//             }, 1000);
//         })
//     }

//     displayPosts();
//     await createPost({title: 'post three', body: 'this is post three'});
//     displayPosts();
//     await createPost({title: 'post four', body: 'this is post four'});
//     displayPosts();
//     await deletePost();
//     displayPosts();
//     await deletePost();
//     displayPosts();
//     await deletePost();
//     displayPosts();
//     await deletePost();
//     displayPosts();

// }

// myfunc();



//Why were promises discovered? promises were created as a better alternative to callback functions. Using callback functions one inside another inside another and so on can lead to something called as callback hell. Promises make the code more readable and easier to manage. In addition to that, promises also have better error handling because of the .catch() method.

//async await makes the code more understandable and easy to manage. It allows us to write asynchronous code which looks like synchronous code, hence, making it easier to read and understand. e.g.
//In the code at the top, using .then() multiple times makes the code look very complicated and hard to understand. On the other hand, the same functionalities were achieved using the await keyword and the code is also quite easy to understand.








