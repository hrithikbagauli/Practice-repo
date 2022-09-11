var form = document.getElementById('my-form');

form.addEventListener('submit', onsubmission);

function onsubmission(e){
    var myname = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    e.preventDefault();
    localStorage.setItem(email, myname);
}

let myobj = {firstname : "hrithik" , age : 23};
let myobj2 = {firstname : "ross", age : 29};
let string_obj = JSON.stringify(myobj);
let original_obj = JSON.parse(string_obj);

localStorage.setItem('myobj', string_obj);
localStorage.setItem('myobj', string_obj);

console.log(string_obj);
console.log(original_obj.firstname);

