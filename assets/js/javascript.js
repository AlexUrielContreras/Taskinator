let buttonEl = document.querySelector("#save-task");
let taskToDoEl = document.querySelector("#task-to-do");

let createTaskHandler = function() {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task";
    taskToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener("click", createTaskHandler)