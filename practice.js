let myform = document.getElementById('myform');
let expenseamount = document.getElementById('expenseamount');
let description = document.getElementById('description');
let category = document.getElementById('category');
let items = document.getElementById('items');

myform.addEventListener('submit', function(e){
    e.preventDefault();
    
    let li = document.createElement('li');
    li.id = description.value;
    let delbtn = document.createElement('button');
    let editbtn = document.createElement('button');

    delbtn.style.marginRight = '4px';
    delbtn.style.marginLeft = '4px';
    editbtn.style.marginRight = '4px';
    editbtn.style.marginLeft = '4px';

    delbtn.appendChild(document.createTextNode('Delete Expense'));
    editbtn.appendChild(document.createTextNode('Edit Expense'));

    li.appendChild(document.createTextNode(expenseamount.value+" - "+category.value+" - "+description.value));
    li.appendChild(delbtn);
    li.appendChild(editbtn);
    
    if(!localStorage.getItem(description.value)){
        items.appendChild(li);
    }

    const obj = new Object();
    obj.expenseamount = expenseamount.value;
    obj.category = category.value;
    localStorage.setItem(description.value, JSON.stringify(obj));
    

    delbtn.addEventListener('click', function(e){
        items.removeChild(e.target.parentElement);
        localStorage.removeItem(e.target.parentElement.id);
    })

    editbtn.addEventListener('click', function(e){
        items.removeChild(e.target.parentElement);
        expenseamount.value = JSON.parse(localStorage.getItem(e.target.parentElement.id)).expenseamount;
        description.value = e.target.parentElement.id;
        category.value = JSON.parse(localStorage.getItem(e.target.parentElement.id)).category;
        localStorage.removeItem(e.target.parentElement.id);
    })
})


