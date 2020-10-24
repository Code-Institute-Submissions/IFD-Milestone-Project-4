//.....TASK TRACKER.....

//..........(1) SELECTORS..........
const input = document.querySelector("#input");
const todoBtn = document.querySelector("#addItem");
const list = document.querySelector("#list");
const edit = document.querySelector(".edit");
const reset = document.querySelector(".reset");
const deleteC = document.querySelector(".delete-completed");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const linethrough = "completed linethrough";


//..........(2) BULK DELETE MODALS..........

// ** Modals from tingle.robinparisi.com **

// SET UP DELETE COMPLETED TASKS MODAL
const deleteCompletedModal = new tingle.modal({
  footer: true,
  cssClass: ['todo-modal'],
});

deleteCompletedModal.setContent('<h1>Delete Completed Tasks?</h1>');

deleteCompletedModal.addFooterBtn('Yes', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function () {
  deleteCompleted();
  deleteCompletedModal.close();
});

deleteCompletedModal.addFooterBtn('No', 'tingle-btn tingle-btn--default tingle-btn--pull-right', function () {
  deleteCompletedModal.close();
});

// SET UP DELETE ALL TASKS MODAL
const deleteAllModal = new tingle.modal({
  footer: true,
  cssClass: ['todo-modal'],
});

deleteAllModal.setContent('<h1>Delete All Tasks?</h1>');

deleteAllModal.addFooterBtn('Yes', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function () {
  deleteAll();
  deleteAllModal.close();
});

deleteAllModal.addFooterBtn('No', 'tingle-btn tingle-btn--default tingle-btn--pull-right', function () {
  deleteAllModal.close();
});


//..........(3) FUNCTIONS..........

// RENDER STORED TASK ITEMS (IF ANY) WHEN PAGE LOADS
function getToDo () {
  // Check if tasks already stored
  if(localStorage.getItem("storedList") === null) {
    return;
  }

  let storedList;
  //Recall items from local storage
  storedList = JSON.parse(localStorage.getItem("storedList"));
  storedList.forEach(function(item) {
      renderItem(item.todo, item.completed);
  });
}

// ADD TASK
// (a) If input contains value and PLUS button pressed
todoBtn.addEventListener("click", function() {
    let todo = input.value;
    if(todo) {
        addItem(todo);
    }
});

// (b) If input contains value and return key (13) pressed
document.addEventListener("keypress", function(event) {
    if(event.which === 13) {
        let todo = input.value;
        if(todo) {
            addItem(todo);
        }
    }
});

function addItem(todo) {
  renderItem(todo);
  input.value="";
}

// RENDER TASK
function renderItem(todo, completed) {
  const done = completed ? check : uncheck;
  const line = completed ? linethrough : "";
  
  const item = `<li>
                    <span contenteditable="false" class="text ${line}">${todo}</span>
                    <i class="check far ${done}"></i>
                    <i class="trash fas fa-trash-alt"></i>
                    <i class="edit far fa-edit"></i>
                    <i class="save far fa-save"></i>
                </li>`

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
  reset.classList.add("display-btn");
  deleteC.classList.add("display-btn");
  saveToDo();
}

// SAVE TASKS TO LOCAL STORAGE
function saveToDo (todo) {
  const todoItems = document.querySelectorAll("li");
  const item = document.querySelector("li");

  const storedList = [];

  todoItems.forEach(function(item) {
    storedList.push({
      todo: item.innerText,
      completed: item.querySelector("span").classList.contains("completed"),
    });
  });
  localStorage.setItem("storedList", JSON.stringify(storedList));
}

// DELETE TASK
function deleteToDo(event) {
    let element = event.target;
    const storedList = getToDo;
    if(element.classList.contains("trash")) {
      element.parentElement.remove();
      saveToDo();
    }
}

// EDIT TASK
function editTodo(event) {
    let element = event.target;
    let span = element.parentNode.querySelector(".text");
    let save = element.parentNode.querySelector(".save");
    let check = element.parentNode.querySelector(".check");
    let edit = element.parentNode.querySelector(".edit");
    let trash = element.parentNode.querySelector(".trash");

    if(element.classList.contains("edit")) {
        span.contentEditable = true;
        save.classList.add("display-save");
        check.classList.add("noDisplay");
        edit.classList.add("noDisplay");
        trash.classList.add("noDisplay");
        span.focus();

        span.addEventListener("keypress", function(event) {
            if(event.which === 13) {
                span.contentEditable = false;
                save.classList.remove("display-save");
                check.classList.remove("noDisplay");
                edit.classList.remove("noDisplay");
                trash.classList.remove("noDisplay");
            }
            saveToDo();
        });

        save.addEventListener("click", function(event) {
            let element = event.target;

            if(element.classList.contains("save")) {
                span.contentEditable = false;
                save.classList.remove("display-save");
                check.classList.remove("noDisplay");
                edit.classList.remove("noDisplay");
                trash.classList.remove("noDisplay");
            }
            saveToDo();
        });
    }
}

// COMPLETE TASK
function completeToDo(event) {
  let element = event.target;
  if(element.classList.contains("check")) {
    element.classList.toggle("fa-circle");
    element.classList.toggle("fa-check-circle");
    element.parentNode.querySelector(".text").classList.toggle("completed");
    element.parentNode.querySelector(".text").classList.toggle("linethrough");
    saveToDo();
  }
}

// DELETE COMPLETED TASKS
function deleteCompleted() {
  let storedList = JSON.parse(localStorage.getItem("storedList"));
  storedList = storedList.filter(todo => !todo.completed);
  localStorage.clear();
  list.innerHTML = '';
  storedList.forEach(function(item) {
    renderItem(item.todo);
  });
  localStorage.setItem("storedList", JSON.stringify(storedList));
}

// DELETE ALL TASKS
function deleteAll() {
    localStorage.clear();
    location.reload();
}


//..........(4) EVENT LISTENERS..........

// RENDER STORED TASK ITEMS (IF ANY) WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", getToDo);

// DELETE TASK
list.addEventListener("click", deleteToDo);

// EDIT TASK
list.addEventListener("click", editTodo);

// COMPLETE TASK
list.addEventListener("click", completeToDo);

// DELETE COMPLETED TASKS
deleteC.addEventListener("click", function() {
  deleteCompletedModal.open();
});

// DELETE ALL TASKS
reset.addEventListener("click", function() {
  deleteAllModal.open();
});