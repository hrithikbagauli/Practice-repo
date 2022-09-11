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
    var contents = itemlist.querySelectorAll('li');

    for(let i=0; i<contents.length; i++){
        var itemname = contents[i].firstChild.textContent;
        var descname = contents[i].firstChild.nextSibling.textContent;

        if(itemname.toLowerCase().indexOf(text) != -1 || descname.toLowerCase().indexOf(text) != -1){
            contents[i].style.display = 'block';
        }
        else{
            contents[i].style.display = 'None';
        }
    }

}