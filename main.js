var myform = document.getElementById('myform');

myform.addEventListener('submit', onsubmission);

function onsubmission(e){
    e.preventDefault();
    var myname = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    if(localStorage.getItem(email)){
        removeFromScreen(email);
    }

    var temp_obj = new Object();
    temp_obj.myname = myname;
    temp_obj.email = email;

    localStorage.setItem(email, JSON.stringify(temp_obj));

    var deletebtn = document.createElement('button');
    var editbtn = document.createElement('button');
    deletebtn.id = 'deletebtn';
    editbtn.id = 'editbtn';
    var li = document.createElement('li');
    li.id = email;
    var ul = document.getElementById('items');

    editbtn.appendChild(document.createTextNode('Edit'));
    deletebtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(document.createTextNode(myname+" "+email));
    deletebtn.style.marginLeft = '10px';
    editbtn.style.marginLeft = '10px';
    li.appendChild(editbtn);
    li.appendChild(deletebtn);
    ul.appendChild(li);

    deletebtn.addEventListener('click', deleteitem);
    function deleteitem(e){
        var li = e.target.parentElement;
        localStorage.removeItem(li.id);
        ul.removeChild(li);
    }

    function removeFromScreen(email){
        var li = document.getElementById(email);
        var ul = document.getElementById('items');
        ul.removeChild(li);
    }
}




