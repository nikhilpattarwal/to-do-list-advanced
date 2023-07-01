
const taskInput = document.querySelector(".input-task");
const newTaskDiv = document.querySelector(".new-task");
const taskCount = document.querySelector(".tasks-left");
const plusIcon = document.querySelector(".add-icon");
const trashAllTasks = document.querySelector(".trash-clear");
const taskWord = document.querySelector(".task-word");
const allTasks = document.querySelector(".dbl-check-comp");
const completedTasks = document.querySelector(".completedTasks");
const uncompletedTasks = document.querySelector(".uncompletedTasks");
const allPresentTasks = document.querySelector(".allPresentTasks");
const leftAdded = document.querySelector(".left-added")


// to change text pattern like 0 task, 1 task, 2 tasks
let count = 0;
taskCount.innerHTML = count;

if (parseInt(count) === 1 || parseInt(count) === 0) {
  taskWord.innerHTML = "task";
} else {
  taskWord.innerHTML = "tasks";
}


// enter event listner
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    createNewTask();
  }
});
//plus icon event listner
plusIcon.addEventListener("click", function () {
  createNewTask();
})


function createNewTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    return;
  }

  // Generate a unique id for the task
  const taskId = generateUniqueId();

  // Create a new task element
  const taskElement = createTaskElement(taskValue, taskId);

  // Append the new task element to the new-task div
  addTaskToDOM(taskElement);


  // Clear the input field
  taskInput.value = "";
}


function createTaskElement(taskValue, taskId) {
  // Create a new task element
  const taskElement = document.createElement("div");
  taskElement.className = "task";
  taskElement.id = taskId;

  // Create checkbox element and add it to the task element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = false;
  taskElement.appendChild(checkbox);

  // Create label element for the task value
  const label = document.createElement("label");
  label.textContent = taskValue;
  taskElement.appendChild(label);

  // Create minus icon element and add it to the task element
  const minusIcon = document.createElement("i");
  minusIcon.className = "fa-solid fa-circle-minus";
  taskElement.appendChild(minusIcon);

  // Add event listener to the delete icon
  minusIcon.addEventListener("click", function () {
    deleteTask(taskId);
  });

  checkbox.addEventListener("change", function () {
    label.classList.toggle("cut-line", checkbox.checked);
  });


  return taskElement;
}

function addTaskToDOM(taskElement) {
  // Append the new task element to the new-task div
  newTaskDiv.appendChild(taskElement);
  count += 1;
  taskCount.innerHTML = count;
  leftAdded.innerHTML = "added"
  updateTaskCount();

  // Apply the fade-in animation to the task element
  setTimeout(() => {
    taskElement.classList.add('fade-in');
  }, 0);
}


function deleteTask(taskId) {
  // Find the task element by its id
  const taskElement = document.getElementById(taskId);

  // Check if the task element exists
  if (taskElement) {
    // Add a class to apply the animation
    taskElement.classList.add('slide-right');

    // Wait for the animation to finish
    setTimeout(() => {
      // Remove the task element from the DOM
      taskElement.remove();
      count -= 1;
      taskCount.innerHTML = count;
      leftAdded.innerHTML = "left";
      updateTaskCount();
    }, 300); // Adjust the delay to match the animation duration
  }
}


// Update the task count
function updateTaskCount() {
  taskCount.innerHTML = count;
  if (count <= 1) {
    taskWord.innerHTML = "task";
  } else {
    taskWord.innerHTML = "tasks";
  }
}
// generate unique id for every task
function generateUniqueId() {
  return Date.now().toString();
}

//   clear all tasks 
trashAllTasks.addEventListener("click", function () {
  const taskElements = document.querySelectorAll(".task");

  taskElements.forEach(function (taskElement) {
    taskElement.classList.add('slide-right');

    // Wait for the animation to finish
    setTimeout(() => {
      // Remove the task element from the DOM
      taskElement.remove();
      count -= 1;
      taskCount.innerHTML = count;
      updateTaskCount();
    }, 1000);
  });
});


// Complete all tasks
function completeAllTasks() {
  const checkboxes = document.querySelectorAll(".task input[type='checkbox']");
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = !checkbox.checked;
    const label = checkbox.nextElementSibling;
    label.classList.toggle("cut-line");
  });
}
allTasks.addEventListener("click", completeAllTasks);


// show completed tasks
function showCompleted() {
  const taskElements = document.querySelectorAll(".task");
  const checkboxes = document.querySelectorAll(".task input[type='checkbox']");

  taskElements.forEach(function (taskElement, index) {
    if (checkboxes[index].checked) {
      taskElement.style.display = 'flex';
    } else {
      taskElement.style.display = 'none';
    }
  });
}
completedTasks.addEventListener("click", showCompleted);


// show uncomplete tasks
function showUncomplete() {
  const taskElements = document.querySelectorAll(".task");
  const checkboxes = document.querySelectorAll(".task input[type='checkbox']");

  taskElements.forEach(function (taskElement, index) {
    if (!checkboxes[index].checked) {
      taskElement.style.display = 'flex';
    } else {
      taskElement.style.display = 'none';
    }
  });
}
uncompletedTasks.addEventListener("click", showUncomplete);


// show all tasks
function showAll() {
  const taskElements = document.querySelectorAll(".task");

  taskElements.forEach(function (taskElement) {
    taskElement.style.display = 'flex';
  });
}
allPresentTasks.addEventListener("click", showAll);


// input event listner to controll hide effect on plus icon
taskInput.addEventListener("input", function () {
  if (taskInput.value.trim() === "") {
    plusIcon.style.display = "none";
  } else {
    plusIcon.style.display = "inline";
  }
});

// Initially hide the plus icon if the input field is empty
if (taskInput.value.trim() === "") {
  plusIcon.style.display = "none";
} else {
  plusIcon.style.display = "inline";
}





