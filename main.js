var myform = document.getElementById('myform');

myform.addEventListener('submit', onsubmission);

function onsubmission(e){
    e.preventDefault();
    var myname = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    var temp_obj = new Object();
    temp_obj.myname = myname;
    temp_obj.email = email;

    localStorage.setItem(email, JSON.stringify(temp_obj));

    var li = document.createElement('li');
    var ul = document.getElementById('items');
    li.appendChild(document.createTextNode(myname+" "+email));
    ul.appendChild(li);
}


