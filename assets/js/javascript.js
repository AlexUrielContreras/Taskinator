let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#task-to-do");

let taskFormHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Package up data as an object
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    
    // Sends it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

let createTaskEl = function (taskDataObj) {
    // Create List Items 
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");

    // Give it a class name
    taskInfoEl.className = "task-info";

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

   listItemEl.appendChild(taskInfoEl);

   // Add entire list item to list
   tasksToDoEl.appendChild(listItemEl);  
}



formEl.addEventListener("submit", taskFormHandler);