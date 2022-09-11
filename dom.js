var form = document.getElementById('addForm');
var itemlist = document.getElementById('items');
var filter = document.getElementById('filter');


form.addEventListener('submit', addItem);

function addItem(e){
    e.preventDefault();

    var newItem = document.getElementById('item').value;
    var newItem2 = document.getElementById('item2').value;

    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(" "+newItem2));

    var editbtn = document.createElement('button');
    editbtn.className = 'btn btn-danger btn-sm float-right delete';
    editbtn.appendChild(document.createTextNode('Edit'));
    editbtn.style.marginRight = '10px';

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    li.appendChild(deleteBtn);
    li.appendChild(editbtn);
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

filter.addEventListener('keyup', filterItems);

function filterItems(e){
    var text = e.target.value.toLowerCase();
    var items = itemlist.getElementsByTagName('li');
    Array.from(items).forEach(function (item){
        var itemname = item.firstChild.textContent;
        if(itemname.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        }
        else{
            item.style.display = 'None';
        }
    })

}