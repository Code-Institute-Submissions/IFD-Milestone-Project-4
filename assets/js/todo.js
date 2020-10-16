const listsContainer = document.querySelector(".task-lists");
const listInput = document.querySelector("#list-input");
const listBtn = document.querySelector("#addList");

const LOCAL_STORAGE_LIST_KEY = "task.storedLists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

// DISPLAY STORED TASK LISTS (IF ANY) WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", getLists);

function getLists () {
  // Check if tasks already stored
  if(localStorage.getItem(LOCAL_STORAGE_LIST_KEY) === null) {
    return;
  }
  // Recall items from local storage
  storedLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY));
  storedLists.forEach(function(item) {
      displayList(item.title, item.id, item.tasks);
  });
}

// ADD TODO
// (a) If input contains value and PLUS button pressed
listBtn.addEventListener("click", function() {
    let list = listInput.value;
    if(list) {
        let uniqueId = Date.now().toString();
        addList(list, uniqueId);
    }
});

// (b) If input contains value and return key (13) pressed
document.addEventListener("keypress", function(event) {
    if(event.which === 13) {
        let list = listInput.value;
        if(list) {
            let uniqueId = Date.now().toString();
            addList(list, uniqueId);
            
        }
    }
});

function addList(list, uniqueId) {
  displayList(list, uniqueId);
  listInput.value="";
}

// DISPLAY TODO
function displayList(list, uniqueId) {

  const html = `<li class="task-list" id="${uniqueId}">
                    <i class="trash fas fa-trash-alt"></i>
                    <i class="edit far fa-edit"></i>
                    <span contenteditable="false" class="text">${list}</span>
                    <i class="save far fa-save"></i>
                </li>`

  const position = "beforeend";
  listsContainer.insertAdjacentHTML(position, html);

  // if (list.id === selectedListId) {
  //   item.classList.add("active-list");
  // }

  saveList();
}


listsContainer.addEventListener("click", selectTaskList);

function selectTaskList(event) {
  let element = event.target;
  if(element.tagName.toLowerCase() === "li") {
    selectedListId = element.id;
    console.log(selectedListId);
  };
}

// SAVE TASK TO LOCAL STORAGE
function saveList (list) {
  const taskItems = document.querySelectorAll("li");
  const item = document.querySelector("li");
  const id = document.querySelector("li").id;
  const storedLists = [];

  taskItems.forEach(function(item) {
    storedLists.push({
      id: item.id,
      title: item.querySelector("span").innerText,
      tasks: []
    });
  });
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(storedLists));
}



// //.....TODO LIST.....

// //..........SELECTORS..........
// const input = document.querySelector("#input");
// const todoBtn = document.querySelector("#addItem");
// const listItems = document.querySelector("#todo-items");
// const edit = document.querySelector(".edit");
// const reset = document.querySelector(".reset");

// const check = "fa-check-circle";
// const uncheck = "fa-circle";
// const linethrough = "completed linethrough";


// // DISPLAY STORED TODO ITEMS (IF ANY) WHEN PAGE LOADS
// document.addEventListener("DOMContentLoaded", getToDo);

// function getToDo () {
//   // Check if tasks already stored
//   if(localStorage.getItem("storedList") === null) {
//     return;
//   }

//   let storedList;
//   //Recall items from local storage
//   storedList = JSON.parse(localStorage.getItem("storedList"));
//   storedList.forEach(function(item) {
//       displayItem(item.todo, item.completed);
//   });
// }

// // ADD TODO
// // (a) If input contains value and PLUS button pressed
// todoBtn.addEventListener("click", function() {
//     let todo = input.value;
//     if(todo) {
//         addItem(todo);
//     }
// });

// // (b) If input contains value and return key (13) pressed
// document.addEventListener("keypress", function(event) {
//     if(event.which === 13) {
//         let todo = input.value;
//         if(todo) {
//             addItem(todo);
//         }
//     }
// });

// function addItem(todo) {
//   displayItem(todo);
//   input.value="";
// }

// // DISPLAY TODO
// function displayItem(todo, completed) {
//   const done = completed ? check : uncheck;
//   const line = completed ? linethrough : "";
  
//   const item = `<li id="todo-item">
//                     <i class="trash fas fa-trash-alt"></i>
//                     <i class="edit far fa-edit"></i>
//                     <span contenteditable="false" class="text ${line}">${todo}</span>
//                     <i class="save far fa-save"></i>
//                     <i class="check far ${done}"></i>
//                 </li>`

//   const position = "beforeend";
//   listItems.insertAdjacentHTML(position, item);
//   reset.classList.add("display-btn");
//   saveToDo();
// }

// // SAVE TODO TO LOCAL STORAGE
// function saveToDo (todo) {
//   const todoItems = document.querySelectorAll("#todo-item");
//   const item = document.querySelector("#todo-item");

//   const storedList = [];

//   todoItems.forEach(function(item) {
//     storedList.push({
//       // id: Date.now().toString(),
//       todo: item.innerText,
//       completed: item.querySelector("span").classList.contains("completed")
//     });
//   });
//   localStorage.setItem("storedList", JSON.stringify(storedList));
// }

// // DELETE TODO
// listItems.addEventListener("click", deleteToDo);

// function deleteToDo(event) {
//     let element = event.target;
//     const storedList = getToDo;
//     if(element.classList.contains("trash")) {
//       element.parentElement.remove();
//       saveToDo();
//     }
// }

// // EDIT TODO
// listItems.addEventListener("click", editTodo);

// function editTodo(event) {
//     let element = event.target;
//     let span = element.parentNode.querySelector(".text");
//     let save = element.parentNode.querySelector(".save");
//     let check = element.parentNode.querySelector(".check");

//     if(element.classList.contains("edit")) {
//         span.contentEditable = true;
//         save.classList.add("display-save");
//         check.classList.add("noDisplay");
//         span.focus();

//         span.addEventListener("keypress", function(event) {
//             if(event.which === 13) {
//                 span.contentEditable = false;
//                 save.classList.remove("display-save");
//                 check.classList.remove("noDisplay");
//             }
//             saveToDo();
//         });

//         save.addEventListener("click", function(event) {
//             let element = event.target;

//             if(element.classList.contains("save")) {
//                 span.contentEditable = false;
//                 save.classList.remove("display-save");
//                 check.classList.remove("noDisplay");
//             }
//             saveToDo();
//         });
//     }
// }

// // COMPLETE TODO
// listItems.addEventListener("click", completeToDo);

// function completeToDo(event) {
//   let element = event.target;
//   if(element.classList.contains("check")) {
//     element.classList.toggle("fa-circle");
//     element.classList.toggle("fa-check-circle");
//     element.parentNode.querySelector(".text").classList.toggle("completed");
//     element.parentNode.querySelector(".text").classList.toggle("linethrough");
//     saveToDo();
//   }
// }

// // DELETE ALL TODOS
// reset.addEventListener("click", deleteAll);

// function deleteAll() {
//   var question = confirm("Delete your entire ToDo list?");
//   if(question) {
//     localStorage.clear();
//     location.reload();
//   }
// }
