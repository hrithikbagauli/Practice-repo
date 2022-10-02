const flag = false;
const promise1 = function(){
    return new Promise((resolve, reject)=>{
        if(flag==true){
            resolve();
        }
    })
}

promise1().then(console.log('helllooooo')).catch(err=>console.log('not found'))