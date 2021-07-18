const form = document.querySelector("form");
const input = document.querySelector("#taskName");
const deleteAll = document.querySelector("#delete-all");
const taskList = document.querySelector("#task-group");
let items;

// load items
// loadItems();
// call event listeners
eventListeners();

function eventListeners() {
  // submit event
  form.addEventListener("submit", addNewItem);
  // delete an item
  taskList.addEventListener("click", deleteItem);
  // delete all items
  deleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

// get items from Local Storage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// set item to Local Storage
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// delete item from LS
function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item) {
    if (item === text) {
      localStorage.clear()
    }
  });

  localStorage.setItem("items", JSON.stringify(items));
}

// create item
function createItem(text) {
  taskList.innerHTML += `
      <li class="d-flex justify-content-between align-items-center p-3 m-3 border task ">
      ${text}       
      <button  id="delete-item" class="btn btn-outline-danger ml-3 my-2"><i class="fas fa-trash-alt"></i></button> 
      </li>`;
}

// add new item
function addNewItem(e) {
  if (input.value === "") {
    alert("Add new item");
  }

  // add item to list
  createItem(input.value);

  // save to local storage
  setItemToLS(input.value);

  // clear input
  input.value = "";
  e.preventDefault();
}

// delete an item
function deleteItem(e) {
  
  if (e.target.className === "fas fa-trash-alt") {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      // delete item from locale storage
      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}

// delete all items
function deleteAllItems() {
  if (confirm("are you sure ?")) {
    // taskList.innerHTML='';
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}


function store() {
  window.localStorage.myitems = list.innerHTML;
}

let storedValue = localStorage
console.log(storedValue.length)
