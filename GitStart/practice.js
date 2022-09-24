
const posts = [
    {title: 'post one', body: 'this is post one', createdAt: new Date().getTime()},
    {title: 'post two', body: 'this is post two', createdAt: new Date().getTime()}
];

let intervalID = 0;
function getPosts(){
    clearInterval(intervalID);
    intervalID = setInterval(()=>{
        let output = '';
        posts.forEach((jello) => {

            output = output + `<li>${jello.title} - last updated: ${(new Date().getTime() - jello.createdAt)/1000} seconds ago</li>`;
        }); 
        document.body.innerHTML = output;
    },1000)      
}

function createPost(post, callback){
    setTimeout(() => {
        posts.push({...post, createdAt: new Date().getTime()});
        callback();
    }, 2000);
}


function create4thPost(post,callback){
    setTimeout(() => {
        callback({title: 'post three', body: 'this is post three'}, getPosts);
        posts.push({...post, createdAt: new Date().getTime()});
    }, 6000);
}


create4thPost({title:'post four', body: 'this is post four'}, createPost)
