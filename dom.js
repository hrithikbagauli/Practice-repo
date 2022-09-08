// console.dir(document);
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// document.title = 'hello';
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[1]);
// // document.all[10].textContent = 'hello';
// console.log(document.forms);
// console.log(document.links);
// console.log(document.forms[0]);
// console.log(document.images);

//console.log(document.getElementById('header-title'));
// var header = document.getElementById('header-title');
// // header.textContent = 'hello';
// // header.innerText = 'bye';

// // header.innerHTML = '<h1> hello </h1>'
// header.style.borderBottom = '4px solid black';
// document.querySelector('.title').style.color = 'green';
// document.querySelector('.title').style.fontWeight = 'bold';

var items = document.getElementsByClassName('list-group-item')
console.log(items);
console.log(items[1]);
items[1].textContent = 'hello';
items[2].style.background = 'green';

for(let i=0; i<items.length; i++){
    items[i].style.fontWeight = 'bold';
    items[i].style.color = 'green';
}