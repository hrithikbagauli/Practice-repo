var form = document.getElementById('my-form');

form.addEventListener('submit', onsubmission);

function onsubmission(e){
    var myname = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    e.preventDefault();
    localStorage.setItem(email, myname);
}



