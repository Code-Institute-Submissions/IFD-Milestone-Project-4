//......Task Tracker......

//..........(1) Selectors..........
const taskInput = document.querySelector("#taskInput");
const taskBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");
const reset = document.querySelector(".reset");
const delCompleted = document.querySelector(".delete-completed");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const linethrough = "completed linethrough";


//..........(2) Bulk Delete Modals..........

// ** Modals from tingle.robinparisi.com **

// Set up deleted completed tasks modal
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

// Set up delete all tasks modal
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


//..........(3) Functions..........

// Render stored task items (if any) when page loads
function renderExistingTasks () {
  // Check if tasks already stored
  if(localStorage.getItem("storedList") === null) {
    return;
  }

  let storedList;
  //Recall items from local storage
  storedList = JSON.parse(localStorage.getItem("storedList"));
  storedList.forEach(item => renderNewTask(item.todo, item.completed));
}

// Add Task
// (a) If input field contains value and PLUS button is pressed
taskBtn.addEventListener("click", function() {
    addItem();
});

// (b) If input field contains value and return key (13) pressed
document.addEventListener("keypress", function(event) {
    if(event.which === 13) {
        addItem();
    }
});

function addItem() {
  let todo = taskInput.value;
  if(todo) {
      renderNewTask(todo);
      saveTask(todo);
      taskInput.value="";
  }
}

// Render Task
function renderNewTask(todo, completed) {
  const done = completed ? check : uncheck;
  const line = completed ? linethrough : "";
  
  const item = `<li class="taskItem">
                    <span contenteditable="false" class="taskContent text ${line}">${todo}</span>
                    <i class="check far ${done}"></i>
                    <i class="trash fas fa-trash-alt"></i>
                    <i class="editTask far fa-edit"></i>
                    <i class="save far fa-save"></i>
                </li>`

  const position = "beforeend";
  taskList.insertAdjacentHTML(position, item);
  reset.classList.add("display-btn");
  delCompleted.classList.add("display-btn");
}

// Save tasks to Local Storage
function saveTask (todo) {
  const todoItems = document.querySelectorAll("li");

  const storedList = []

  todoItems.forEach(item => storedList.push({
      todo: item.innerText,
      completed: item.querySelector("span").classList.contains("completed")
    })
  );
  localStorage.setItem("storedList", JSON.stringify(storedList));
}

// Delete Task
function deleteTask(event) {
    let element = event.target;
    if(element.classList.contains("trash")) {
      element.parentElement.remove();
      saveTask();
    }
}

// Edit Task
function editTask(event) {
    let element = event.target;
    let span = element.parentNode.querySelector(".text");
    let save = element.parentNode.querySelector(".save");
    let check = element.parentNode.querySelector(".check");
    let edit = element.parentNode.querySelector(".editTask");
    let trash = element.parentNode.querySelector(".trash");

    if(element.classList.contains("editTask")) {
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
            saveTask();
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
            saveTask();
        });
    }
}

// Complete Task
function completeTask(event) {
  let element = event.target;
  if(element.classList.contains("check")) {
    element.classList.toggle("fa-circle");
    element.classList.toggle("fa-check-circle");
    element.parentNode.querySelector(".text").classList.toggle("completed");
    element.parentNode.querySelector(".text").classList.toggle("linethrough");
    saveTask();
  }
}

// Delete Completed Tasks
function deleteCompleted() {
  let storedList = JSON.parse(localStorage.getItem("storedList"));
  storedList = storedList.filter(todo => !todo.completed);
  localStorage.clear();
  taskList.innerHTML = '';
  storedList.forEach(item => renderNewTask(item.todo));
  localStorage.setItem("storedList", JSON.stringify(storedList));
}

// Delete All Tasks
function deleteAll() {
    localStorage.clear();
    location.reload();
}


//..........(4) Event Listeners..........

// Render stored task items (if any) when page loads
document.addEventListener("DOMContentLoaded", renderExistingTasks);

// Delete Task
taskList.addEventListener("click", deleteTask);

// Edit Task
taskList.addEventListener("click", editTask);

// Complete Task
taskList.addEventListener("click", completeTask);

// Delete Completed Tasks
delCompleted.addEventListener("click", function() {
  deleteCompletedModal.open();
});

// Delete All Tasks
reset.addEventListener("click", function() {
  deleteAllModal.open();
});