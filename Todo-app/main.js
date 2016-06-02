var todos = [];

// Add a new todo 'li' element
var addNewItem = function (event) {
    event.stopPropagation();
    var newItem = document.getElementById('new-todo').value;
    if (event.keyCode == 13 && newItem != '') {
        todos.push({ id: getTodoId(), value: newItem});
        createNewListNode(newItem, todos.length);
        document.getElementById('new-todo').value = null;
        setSessionStorage(todos);
    }
}

// Remove the deleted todo from 'todos' array and remove the 'li' element
var clearItem = function(event, elem) {
    event.stopPropagation();
    let id = elem.getAttribute('index');
    todos.forEach((item, index) => {
        if (item.id == id) {
            todos.splice(index, 1);
        }
    });
    setSessionStorage(todos);
    elem.parentNode.parentNode.removeChild(elem.parentNode);
}

// Append an 'li' node to the 'ul'
var createNewListNode = function(text, index) {
    let ul = document.getElementById('todo-list');
    let li = document.createElement("li");
    li.innerHTML = text + '<button type="button" class="close" onclick="clearItem(event, this)" index="'+ index +'"><span>&times;</span></button>';
    ul.appendChild(li);
}

// Get the todos from the session storage once the windo loads
var loadFromSessionStorage = function() {
    let storedTodos = window.sessionStorage ? sessionStorage.getItem('todos') : [];
    if(storedTodos) {
        todos = JSON.parse(storedTodos);
        todos.forEach(item => createNewListNode(item.value, item.id));
    }
}

// Sessionstorage can only store strings. So, stringify the todos object before storage.
var setSessionStorage = function(todos) {
    sessionStorage.setItem('todos', JSON.stringify(todos));
}

// Return a unique id for a new item
var getTodoId = function() {
    let idArray = todos.map(item => item.id);
    let [maxId=0] = idArray;
    idArray.forEach(id => { maxId = id > maxId ? id : maxId; });
    return maxId+1;
}

window.onload = function() {
    loadFromSessionStorage();
}
