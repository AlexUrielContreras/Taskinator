let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#task-to-do");
let taskIdCounter = 0;
var tasksInProgressEl = document.querySelector("#task-in-progress");
var tasksCompletedEl = document.querySelector("#task-completed");

let pageContentEl = document.querySelector("#page-content");

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

    let isEdit = formEl.hasAttribute('data-task-id');
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
      } 
      // no data attribute, so create object as normal and pass to createTaskEl function
      else {
        var taskDataObj = {
          name: taskNameInput,
          type: taskTypeInput
        };
      
        createTaskEl(taskDataObj);
      }

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

   
};

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

let taskButtonHandler = function(event) {
    // Get target element from event
    let targetEl = event.target

    if (targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    if (targetEl.matches(".delete-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

let deleteTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

let editTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    

    let taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector('#save-task').textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

let completeEditTask = function(taskName, taskType, taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated!")
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

let taskStatusChangeHandler = function(event) {
    // get the task item's id
  let taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  let statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if(statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};


pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);