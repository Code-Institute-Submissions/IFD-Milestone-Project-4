//......Task Tracker......

//..........(1) Selectors..........

/**
 * Setting selector variables
*/
const taskInput = document.querySelector("#taskInput");
const taskBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");
const reset = document.querySelector(".reset");
const delCompleted = document.querySelector(".delete-completed");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINETHROUGH = "completed linethrough";


//..........(2) Bulk Delete Modals..........

/**
 * Set up the delete completed tasks modal.
 * Modal is utilised from tingle.robinparisi.com
 * Modal is opened when corresponding event listener is triggered.
 * 
 * Modal requests an action from the user.
 * Modal calls the deleteCompleted function if the user selects "Yes" and then the closes.
 * Otherwise, if the user selects "No" to modal simply closes.
 */
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

/**
 * Set up the delete all tasks modal.
 * Modal is utilised from tingle.robinparisi.com
 * Modal is opened when corresponding event listener is triggered.
 * 
 * Modal requests an action from the user.
 * Modal calls the deleteAll function if the user selects "Yes" and then the closes.
 * Otherwise, if the user selects "No" to modal simply closes.
 */
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

/**
 * Render existing tasks (if any) from local storage.
 * This function should be called as soon as page loads.
 * 
 * Checks if there are any items already stored.
 * @returns {null} if there are no items stored.
 * 
 * @returns {array} storedList including todo items and corresponding completed status from local storage.
 * Calls renderNewTask function on each stored item.
 */
function renderExistingTasks () {
    if(localStorage.getItem("storedList") === null) {
        return;
    }

    let storedList;
    storedList = JSON.parse(localStorage.getItem("storedList"));
    storedList.forEach(item => renderNewTask(item.todo, item.completed));
    return storedList;
}

/**
 * Generate new task item, render to the browser and save to local storage.
 * Two event listeners to initiate action:
 * (1) click event listener on "ADD" input field button.
 * (2) keypress even listener on keyboard return key.
 * Both event listeners call addItem function.
 * 
 * addItem function calls renderNewTask function, saveTask function and clears the task input field.
 */
taskBtn.addEventListener("click", function() {
    addItem();
});

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

/**
 * Renders task item to browser, whether new item or fetched from local storage.
 * If fetched from local storage, the following parameters are utilised:
 * @param {string} todo 
 * @param {boolean} completed 
 * 
 * Function enables the completed status (complete/incomplete) of each item to be reflected.
 * done and line variables check completed boolean status.
 * New items are, by default, not complete.
 */
function renderNewTask(todo, completed) {
    const done = completed ? CHECK : UNCHECK;
    const line = completed ? LINETHROUGH : "";
    
    const item = `<li class="taskItem">
                      <span contenteditable="false" class="taskContent text ${line}">${todo}</span>
                      <i class="check far ${done}"></i>
                      <i class="trash fas fa-trash-alt"></i>
                      <i class="editTask far fa-edit"></i>
                      <i class="save far fa-save"></i>
                  </li>`;

    const position = "beforeend";
    taskList.insertAdjacentHTML(position, item);
    reset.classList.add("display-btn");
    delCompleted.classList.add("display-btn");
}

/**
 * Saves each task item to local storage.
 * For each li element the text and completed status (true or false) is pushed to local storage array.
 * 
 * @param {string} todo 
 */
// Save tasks to Local Storage
function saveTask (todo) {
  const todoItems = document.querySelectorAll("li");

  const storedList = [];

  todoItems.forEach(item => storedList.push({
      todo: item.innerText,
      completed: item.querySelector("span").classList.contains("completed")
    })
  );
  localStorage.setItem("storedList", JSON.stringify(storedList));
}

/**
 * Enables the user to delete a task list item.
 * This function should be called when the corresponding event listener is triggered.
 * 
 * @param {click} event 
 */
// Delete Task
function deleteTask(event) {
    let element = event.target;
    if(element.classList.contains("trash")) {
        element.parentElement.remove();
        saveTask();
    }
}

/**
 * Enables the user to edit a task list item.
 * This function should be called when the corresponding event listener is triggered.
 * 
 * The edit of the task list can be finised by either key press of the return key or by
 * pressing the SAVE icon.
 * 
 * @param {click} event 
 */
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

/**
 * Enables the user to mark a task list item complete.
 * This function should be called when the corresponding event listener is triggered.
 * 
 * @param {click} event 
 */
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

/**
 * Deletes all completed tasks.
 * This function should be called if user selects "Yes" within deleteCompletedModal.
 * 
 * Sets storedList array to the current stored list but excluding items marked complete.
 * Clears local storage and current rendered task list.
 * 
 * Calls renderNewTask on each item in the (new) storedList array.
 * Saves the (new) storedList to local storage.
 */
// Delete Completed Tasks
function deleteCompleted() {
    let storedList = JSON.parse(localStorage.getItem("storedList"));
    storedList = storedList.filter(todo => !todo.completed);
    localStorage.clear();
    taskList.innerHTML = '';
    storedList.forEach(item => renderNewTask(item.todo));
    localStorage.setItem("storedList", JSON.stringify(storedList));
}

/**
 * Deletes all tasks.
 * This function should be called if user selects "Yes" within deletedAllModal.
 * 
 * Clears local storage meaning there is no storedList to render to the browser.
 */
// Delete All Tasks
function deleteAll() {
    localStorage.clear();
    location.reload();
}


//..........(4) Event Listeners..........

/**
 * Render existing tasks (if any) from local storage.
 * This function should be called as soon as page loads.
 */
document.addEventListener("DOMContentLoaded", renderExistingTasks);

/**
 * Initiates the deletion of task when click event listener is triggered.
 */
taskList.addEventListener("click", deleteTask);

/**
 * Initiates the ability to edit an existing task when click event listener is triggered.
 */
taskList.addEventListener("click", editTask);

/**
 * Initiates the marking of an existing task as complete when click event listener is triggered.
 */
taskList.addEventListener("click", completeTask);

/**
 * Initiates the option to delete all tasks marked as complete.
 * Opens deleteCompletedModal when click event listener is triggered.
 */
delCompleted.addEventListener("click", function() {
  deleteCompletedModal.open();
});

/**
 * Initiates the option to delete all tasks currently rendered to the browser.
 * Opens deleteAllModal when click event listener is triggered.
 */
reset.addEventListener("click", function() {
  deleteAllModal.open();
});