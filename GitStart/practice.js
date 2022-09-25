
// const posts = [{title: 'post one', body: 'this is post one'}, {title: 'post two', body: 'this is post two'}];

// function getPosts(){
//     setTimeout(() => {
//         let output = '';
//         posts.forEach((jello)=>{
//             output = output + `<li> ${jello.title} </li>`;
//         })
//         document.body.innerHTML = output;
//     }, 0);
// }

// function createPost(post){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             posts.push(post);
//             const error = false;

//             if(!error){
//                 resolve();
//             }
//             else{
//                 reject('soomething went wrogn');
//             }
//         }, 6000);
//     })
// }

// const promise1 = createPost({title: 'post three', body: 'this is post three'}).then(getPosts).catch(bob=>console.log(bob));

// // function deletePost(){
// //     return new Promise((resolve, reject)=>{
// //         setTimeout(() => {
// //             if(posts.pop()){
// //                 resolve();
// //             }
// //             else{
// //                 reject('an error was encountered');
// //             }
            
// //         }, 1000);
// //     });
// // }

// // deletePost().then(()=>{
// //     getPosts();
// //     deletePost().then(()=>{
// //         getPosts();
// //             deletePost().then(()=>{
// //                 getPosts();
// //                 createPost4({title: 'post four', body: 'this is post four'}).then(()=>{
// //                     getPosts();
// //                     deletePost().then(()=>{
// //                         getPosts();
// //                 })
// //             });
// //         })
// //     })
// // })


// // function createPost4(post){
// //     return new Promise((resolve, reject)=>{
// //         setTimeout(() => {
// //             posts.push(post);
// //             const error = false;

// //             if(!error){
// //                 resolve();
// //             }
// //             else{
// //                 reject('soomething went wrogn');
// //             }
// //         }, 1000);
// //     })
// // }

// //.then() takes a function as an argument. A promise can only have one .then() and .catch();


// // const promise1 = Promise.resolve('Hello world');
// // const promise2 = 10;
// // const promise3 = new Promise((resolve, reject)=>
// // setTimeout(resolve, 2000, 'goodbye'));

// // Promise.all([promise1, promise2, promise3]).then(values => console.log(values)).catch(error=> console.log('error foud'));



//Question 2 & 3 - 
const posts = [{title: 'post one', body: 'this is post one'}, {title: 'post two', body: 'this is post two'}];
console.log('last active at: '+ new Date());

const createPost = function(post){
    return new Promise((resolve, reject)=>{
        console.log('processing...');
        setTimeout(() => {
            if(posts.push(post))
            resolve(posts);
            else{
            reject();
            }
        }, 5000);
    });
}

const updateUserActivityTime = function(){
    return new Promise((resolve, reject)=>{
        resolve();
    })
}

function deletePost(){
    return new Promise((resolve, reject)=>{
        if(posts.pop())
            resolve();
        else{
            reject();
        }
    })
}

Promise.all([createPost({title:'post three', body: 'this is post three'}), updateUserActivityTime]).then(([r1,r2])=>{
    console.log(r1)
    console.log('last active at: '+ new Date().getTime())
}).then(()=>{
    deletePost().then(()=>{
        console.log(posts);
    });
})

//4. The main reason we use Promise.all is to asynchronously resolve multiple promises at the same time. For example, if there are three promises, each having a delay of 5 seconds, then the total time taken for all the promises to run would be 15 seconds but this can be reduced down to 5 seconds simply by using Promise.all.

//5. Promises are better than callbacks because they have better error handling. Promises make dealing with asynchronous operations easier as they are easier to manage. Instead of using callback functions, one inside another multiple times, leading to callback hell, its better to use a promise.





