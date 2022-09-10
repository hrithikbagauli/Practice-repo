var form = document.getElementById('addForm');
var itemlist = document.getElementById('items');


form.addEventListener('submit', addItem);

function addItem(e){
    e.preventDefault();

    var newItem = document.getElementById('item').value;

    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    li.appendChild(deleteBtn);
    itemlist.append(li);

}

itemlist.addEventListener('click', remove);

function remove(e){
    if(e.target.classList.contains('delete')){
        if(confirm('are you sure?')){
            var li = e.target.parentElement;
            itemlist.removeChild(li);
        }
    }
}