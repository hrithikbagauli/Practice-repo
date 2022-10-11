const myform = document.getElementById('myform');
const expenseamount = document.getElementById('expenseamount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const ul = document.getElementById('items');

document.addEventListener('DOMContentLoaded', async function(e){
    const get_request = await axios.get('https://crudcrud.com/api/aa14b33fb46e42f98bcbf0812f8b7505/expenses').catch(err=>console.log(err));
    get_request.data.forEach(i=>{
        showonscreen(i.expense_amount, i.cat, i.desc, i._id);
    });
})

myform.addEventListener('submit', async function(e){
    e.preventDefault();
    let id;
    const post_request = await axios.post('https://crudcrud.com/api/aa14b33fb46e42f98bcbf0812f8b7505/expenses',{
        expense_amount: expenseamount.value,
        desc: description.value,
        cat: category.value
    }).catch(err=>console.log(err));

    id = post_request.data._id;
    showonscreen(expenseamount.value, category.value, description.value, id);
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
        axios.delete(`https://crudcrud.com/api/aa14b33fb46e42f98bcbf0812f8b7505/expenses/${e.target.parentElement.id}`).catch(err=>console.log(err));
    })

    editbtn.addEventListener('click', function(e){
        e.preventDefault();
        editItem(e.target.parentElement);
        axios.delete(`https://crudcrud.com/api/aa14b33fb46e42f98bcbf0812f8b7505/expenses/${e.target.parentElement.id}`).catch(err=>console.log(err));
    })
}


function deleteItem(target){
     ul.removeChild(target);
}

async function editItem(target){
    const get_request = await axios.get(`https://crudcrud.com/api/aa14b33fb46e42f98bcbf0812f8b7505/expenses/${target.id}`).catch(err=>console.log(err));
    expenseamount.value = get_request.data.expense_amount;
    description.value = get_request.data.desc;
    category.value = get_request.data.cat;
    ul.removeChild(target);
}