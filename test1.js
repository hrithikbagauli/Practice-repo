let id;
const promise1 = Promise.resolve('gu').then(function(val){
    id = val;
})