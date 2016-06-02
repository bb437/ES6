'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var todos = [];

// Add a new todo 'li' element
var addNewItem = function addNewItem(event) {
    event.stopPropagation();
    var newItem = document.getElementById('new-todo').value;
    if (event.keyCode == 13 && newItem != '') {
        todos.push({ id: getTodoId(), value: newItem });
        createNewListNode(newItem, todos.length);
        document.getElementById('new-todo').value = null;
        setSessionStorage(todos);
    }
};

// Remove the deleted todo from 'todos' array and remove the 'li' element
var clearItem = function clearItem(event, elem) {
    event.stopPropagation();
    var id = elem.getAttribute('index');
    todos.forEach(function (item, index) {
        if (item.id == id) {
            todos.splice(index, 1);
        }
    });
    setSessionStorage(todos);
    elem.parentNode.parentNode.removeChild(elem.parentNode);
};

// Append an 'li' node to the 'ul'
var createNewListNode = function createNewListNode(text, index) {
    var ul = document.getElementById('todo-list');
    var li = document.createElement("li");
    li.innerHTML = text + '<button type="button" class="close" onclick="clearItem(event, this)" index="' + index + '"><span>&times;</span></button>';
    ul.appendChild(li);
};

// Get the todos from the session storage once the windo loads
var loadFromSessionStorage = function loadFromSessionStorage() {
    var storedTodos = window.sessionStorage ? sessionStorage.getItem('todos') : [];
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        todos.forEach(function (item) {
            return createNewListNode(item.value, item.id);
        });
    }
};

// Sessionstorage can only store strings. So, stringify the todos object before storage.
var setSessionStorage = function setSessionStorage(todos) {
    sessionStorage.setItem('todos', JSON.stringify(todos));
};

// Return a unique id for a new item
var getTodoId = function getTodoId() {
    var idArray = todos.map(function (item) {
        return item.id;
    });

    var _idArray = _slicedToArray(idArray, 1);

    var _idArray$ = _idArray[0];
    var maxId = _idArray$ === undefined ? 0 : _idArray$;

    idArray.forEach(function (id) {
        maxId = id > maxId ? id : maxId;
    });
    return maxId + 1;
};

window.onload = function () {
    loadFromSessionStorage();
};
