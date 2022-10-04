const myform = document.getElementById('myform');
const expenseamount = document.getElementById('expenseamount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const ul = document.getElementById('items');

document.addEventListener('DOMContentLoaded', function(e){
    axios.get('https://crudcrud.com/api/c4ff8f70321740f7972f0f55ce0d47ae/expenses').then(
        res=>{
            res.data.forEach(i => {
                showonscreen(i.expense_amount, i.cat, i.desc, i._id);
            });
        }
    ).catch(err=>console.log(err));
})

myform.addEventListener('submit', function(e){
    e.preventDefault();
    let id;
    axios.post('https://crudcrud.com/api/c4ff8f70321740f7972f0f55ce0d47ae/expenses',{
        expense_amount: expenseamount.value,
        desc: description.value,
        cat: category.value
    }).then(res=>{
        id = res.data._id;
        showonscreen(expenseamount.value, category.value, description.value, id);
    }).catch(err=>console.log(err));
})

function showonscreen(expense_amount, cat, desc, id){
    const li = document.createElement('li');
    li.id = id;
    const text = document.createTextNode(`${expense_amount} - ${cat} - ${desc} `);
    const delbtn = document.createElement('button');
    delbtn.appendChild(document.createTextNode('Delete expense'));
    const editbtn = document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit expense'));
    li.appendChild(text);
    li.appendChild(delbtn);
    li.appendChild(editbtn);
    ul.appendChild(li);

    delbtn.addEventListener('click', function(e){
        e.preventDefault();
        deleteItem(e.target.parentElement);
        axios.delete(`https://crudcrud.com/api/c4ff8f70321740f7972f0f55ce0d47ae/expenses/${e.target.parentElement.id}`).catch(err=>console.log(err));
    })

    editbtn.addEventListener('click', function(e){
        e.preventDefault();
        editItem(e.target.parentElement);
        axios.delete(`https://crudcrud.com/api/c4ff8f70321740f7972f0f55ce0d47ae/expenses/${e.target.parentElement.id}`).catch(err=>console.log(err));
    })
}


function deleteItem(target){
     ul.removeChild(target);
}

function editItem(target){
    axios.get(`https://crudcrud.com/api/c4ff8f70321740f7972f0f55ce0d47ae/expenses/${target.id}`).then(res=>{
        expenseamount.value = res.data.expense_amount;
        description.value = res.data.desc;
        category.value = res.data.cat;
        ul.removeChild(target);
    })
}