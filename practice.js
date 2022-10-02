// let id;
// axios.post('https://crudcrud.com/api/0658aef84b494c98bb7e963eda06ba2c/loginDetails',{name:'hrithik', email:'sdfsdf@gmail'}).then(res=>{
//     console.log(res.data._id)
// })

const myform = document.getElementById('myform');
const username = document.getElementById('username');
const email = document.getElementById('email');
const div = document.getElementById('error');
const ul = document.getElementById('items');

document.addEventListener('DOMContentLoaded',function(){
    axios.get('https://crudcrud.com/api/a0698aa00e914577b441309e65713a16/loginDetails').then((res)=>{
        res.data.forEach((i) => {
            showOnScreen(i.name, i.email, i._id);
        });
    }
    ).catch(err=>console.log(err));
})

myform.addEventListener('submit', function(e){
    e.preventDefault();
    if(username.value == '' || email.value == ''){
        div.appendChild(document.createTextNode('Please fill both the fields'));
        setTimeout(() => {
            div.removeChild(div.firstChild);
        }, 3000);
    }
    else{
        let id;
        axios.post('https://crudcrud.com/api/a0698aa00e914577b441309e65713a16/loginDetails',{name: username.value, email: email.value}).then(res=>{
            id = res.data._id
            showOnScreen(username.value, email.value, id);
    }).catch(err=>console.log('something went wrong'));
    }
})

function showOnScreen(name, email, id){
    const li = document.createElement('li');
    li.id = id;
    const text = document.createTextNode(name+" - "+email+" ");
    const delbtn = document.createElement('button');
    const editbtn = document.createElement('button');
    delbtn.appendChild(document.createTextNode('Delete'));
    editbtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(text);
    li.appendChild(delbtn);
    li.appendChild(editbtn);
    ul.appendChild(li);

    delbtn.addEventListener('click', function(e){
        e.preventDefault();
        ul.removeChild(e.target.parentElement);
        axios.delete(`https://crudcrud.com/api/a0698aa00e914577b441309e65713a16/loginDetails/${e.target.parentElement.id}`).catch(err=>console.log('something went wrong while trying to delete'));
    })
}    


// // //     delbtn.addEventListener('click',function(e){
// // //         e.preventDefault();
// // //         ul.removeChild(e.target.parentElement);
// // //     })
// // // })

// // // axios.get('https://crudcrud.com/api/c57d7a3abb244e5da078da0599a82e5d/loginDetails').then(res=>console.log(res.data)).catch(err=>console.log('something went wrong'));
// // // axios.delete('https://crudcrud.com/api/a190194a41a4439184b3851c5d01ffee/loginDetails/6337e84506e25f03e8c5dec4');
