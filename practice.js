const myform = document.getElementById('myform');
const username = document.getElementById('username');
const email = document.getElementById('email');
const div = document.getElementById('error');
const ul = document.getElementById('items');

document.addEventListener('DOMContentLoaded',function(){
    axios.get('https://crudcrud.com/api/a190194a41a4439184b3851c5d01ffee/loginDetails').then((res)=>{
        res.data.forEach((i) => {
            const delbtn = document.createElement('button');
            delbtn.appendChild(document.createTextNode('Delete'));
            const editbtn = document.createElement('button');   
            editbtn.appendChild(document.createTextNode('Edit'));
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(i.name+" - "+i.email+" "));
            li.appendChild(delbtn);
            li.appendChild(editbtn);
            ul.appendChild(li);
            delbtn.addEventListener('click',function(e){
                e.preventDefault();
                ul.removeChild(e.target.parentElement);
            })
        });
    }
    ).catch(err=>console.log(err));
})

myform.addEventListener('submit', function(e){
    e.preventDefault();
    const li = document.createElement('li');
    const text = document.createTextNode(username.value+" - "+email.value+"  ");
    const delbtn = document.createElement('button');
    const editbtn = document.createElement('button');   

    if(username.value == '' || email.value == ''){
        div.appendChild(document.createTextNode('Please fill both the fields'));
        setTimeout(() => {
            div.removeChild(div.firstChild);
        }, 3000);
    }
    else{
        delbtn.appendChild(document.createTextNode('Delete'));
        editbtn.appendChild(document.createTextNode('Edit'));
        li.appendChild(text);
        li.appendChild(delbtn);
        li.appendChild(editbtn);
        ul.appendChild(li);
        axios.post('https://crudcrud.com/api/a190194a41a4439184b3851c5d01ffee/loginDetails',{name: username.value, email: email.value}).catch(err=>console.log('something went wrong'));
    }

    delbtn.addEventListener('click',function(e){
        e.preventDefault();
        ul.removeChild(e.target.parentElement);
    })
})

// axios.get('https://crudcrud.com/api/c57d7a3abb244e5da078da0599a82e5d/loginDetails').then(res=>console.log(res.data)).catch(err=>console.log('something went wrong'));
// axios.delete('https://crudcrud.com/api/a190194a41a4439184b3851c5d01ffee/loginDetails/6337e84506e25f03e8c5dec4');
