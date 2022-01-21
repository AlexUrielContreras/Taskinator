let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#task-to-do");
let taskIdCounter = 0;

let taskFormHandler = function(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    // Checks if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);


    // Create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");

    // Give it a class name
    taskInfoEl.className = "task-info";

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

   listItemEl.appendChild(taskInfoEl);

   let taskActionsEl = createTaskActions(taskIdCounter);
   listItemEl.appendChild(taskActionsEl);
   


   // Add entire list item to list
   tasksToDoEl.appendChild(listItemEl);  

   // increase task counter for next unique id 
   taskIdCounter++;
}

let createTaskActions = function(taskId) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To Do", "In Progress", "Complete"];

    for (var i = 0; i < statusChoices.length; i++) {
        // Create option elements
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //appends to select 
        statusSelectEl.appendChild(statusOptionEl);
    };
    return actionContainerEl
}


formEl.addEventListener("submit", taskFormHandler);