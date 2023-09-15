let input = document.querySelector("input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// array of tasks
let arrayTasks = [];

// if local storage has tasks, get them and add them to array
if (localStorage.getItem("tasks")) {
  arrayTasks = JSON.parse(localStorage.getItem("tasks"));
  addTaskToDOM(arrayTasks); // Update the DOM with tasks from local storage
}

// Add task
submit.addEventListener("click", function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
});

// click on task element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // remove from local storage
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    // remove from DOM
    e.target.parentElement.remove();
  }
  // task completed
  if (e.target.classList.contains("task")) {
    const taskId = e.target.getAttribute("data-id");
    togglestatus(taskId);
    e.target.classList.toggle("done");
  }
});

// add task to array
function addTaskToArray(taskText) {
  const task = {
    id: Date.now().toString(), // Convert ID to string for consistency
    name: taskText,
    completed: false,
  };
  // add task to array
  arrayTasks.push(task);
  // add task to local storage and update DOM
  addTaskToLocalStorage(arrayTasks);
  addTaskToDOM([task]);
}

// add task to DOM
function addTaskToDOM(tasks) {
  tasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.classList.add("done");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.name));
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("X"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addTaskToLocalStorage(arrayTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayTasks));
}

// delete task from local storage
function deleteTaskFromLocalStorage(id) {
  arrayTasks = arrayTasks.filter((task) => task.id !== id);
  addTaskToLocalStorage(arrayTasks); // update local storage
}

// toggle status
function togglestatus(id) {
  for (let i = 0; i < arrayTasks.length; i++) {
    if (arrayTasks[i].id === id) {
      arrayTasks[i].completed = !arrayTasks[i].completed;
    }
  }
  addTaskToLocalStorage(arrayTasks);
}