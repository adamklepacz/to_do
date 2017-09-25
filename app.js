/* TO-DO APP
 ** Author: Adam Klepacz
 ** Playground app in plain JS
 ** 2017
 */
document.getElementById('creationTaskForm').addEventListener('submit', saveTask);

//event listeneres for "check task" section
document.getElementById('showHomeTasks').addEventListener('click', function() {
  fetchList('homeTasks');
}, true);
document.getElementById('showWorkTasks').addEventListener('click', function() {
  fetchList('workTasks');
}, true);
document.getElementById('showOtherTasks').addEventListener('click', function() {
  fetchList('otherTasks');
}, true);

//event listener to handle multiple "delete" and "done" buttons
document.addEventListener('click', function(e) {
  let clickedElement = e.target;
  let clickedTask = e.target.closest('li.taskItem');

  while (clickedElement) {
    if (clickedElement.nodeName === "BUTTON" && /actionBtn/.test(clickedElement.className)) {
      let actionName = clickedElement.className; //deleteTask or doneTask
      if (actionName.includes('doneTask')) actionName = 'doneTask';
      if (actionName.includes('deleteTask')) actionName = 'deleteTask';

      switch (actionName) {
        case 'deleteTask':
          deleteTask(clickedTask, clickedElement);
          break;
        case 'doneTask':
          doneTask(clickedTask, clickedElement);
          break;
      }
    }
    clickedElement = clickedElement.parentNode;
  }
}, true);

fetchTaskCount();

function makeId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += Math.floor(Math.random() * 99999);
  }
  return text;
}

//check if id exists in collection of previous ids
function idExist(id) {
  let ids = []; //collection of previous id's

  let homeTaskArr = JSON.parse(localStorage.getItem('homeTasks')) || [];
  let workTaskArr = JSON.parse(localStorage.getItem('workTasks')) || [];
  let otherTaskArr = JSON.parse(localStorage.getItem('otherTasks')) || [];

  homeTaskArr.forEach(function(el) {
    let elId = el.id;
    ids.push(elId);
  });
  workTaskArr.forEach(function(el) {
    let elId = el.id;
    ids.push(elId);
  });
  otherTaskArr.forEach(function(el) {
    let elId = el.id;
    ids.push(elId);
  });

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === id) {
      id = makeId();
      return true;
    }
    return false;
  }
}

function assignId() {
  let id;

  while (true) {
    id = makeId();

    //if id is unique, return id
    if (!idExist(id)) {
      return id;
    }
  }
}

function saveTask(e) {
  e.preventDefault(); //prevent page reload

  if (avoidSpacedString()) {
    document.getElementById('taskArea').style.display = "block";

    let taskTitle = document.getElementById('taskTitle').value;
    let taskPriority = document.getElementById('taskPriority').value;
    let taskCategory = document.getElementById('taskCategory').value += "Tasks";
    let taskId = assignId();
    let isTaskDone = false; //on the very beginning newTask is always NOT DONE(false)

    let creationTaskForm = document.getElementById('creationTaskForm');

    let newTask = {}; //init empty object for storing new task

    newTask = {
      title: taskTitle,
      priority: taskPriority,
      category: taskCategory,
      id: taskId,
      isTaskDone: isTaskDone //boolean
    };

    let homeTasksArr = [];
    let workTaskArr = [];
    let otherTaskArr = [];

    //if localStorage is empty
    if (localStorage.getItem(taskCategory) === null) {
      switch (newTask.category) {
        case 'homeTasks':
          homeTasksArr = [];
          homeTasksArr.push(newTask);

          localStorage.setItem('homeTasks', JSON.stringify(homeTasksArr));
          break;
        case 'workTasks':
          workTaskArr = [];

          workTaskArr.push(newTask);
          localStorage.setItem('workTasks', JSON.stringify(workTaskArr));
          break;
        case 'otherTasks':
          otherTaskArr = [];

          otherTaskArr.push(newTask);
          localStorage.setItem('otherTasks', JSON.stringify(otherTaskArr));
          break;
      }
    } else { //if there is something in localStorage
      switch (newTask.category) {
        case 'homeTasks':
          //parse string stored in localstorage to array
          homeTasksArr = JSON.parse(localStorage.getItem('homeTasks'));
          homeTasksArr.push(newTask);

          localStorage.setItem('homeTasks', JSON.stringify(homeTasksArr));
          break;
        case 'workTasks':
          //parse string stored in localstorage to array
          workTaskArr = JSON.parse(localStorage.getItem('workTasks'));
          workTaskArr.push(newTask);

          localStorage.setItem('workTasks', JSON.stringify(workTaskArr));
          break;
        case 'otherTasks':
          //parse string stored in localstorage to array
          otherTaskArr = JSON.parse(localStorage.getItem('otherTasks'));
          otherTaskArr.push(newTask);

          localStorage.setItem('otherTasks', JSON.stringify(otherTaskArr));
          break;
      }
    }
    fetchList(taskCategory);
  }
  creationTaskForm.reset();
  fetchTaskCount();
}

//fetch list using itemKeyCategory form localstorage
function fetchList(taskCategory) {
  let tasksArr = [];
  try {
    tasksArr = JSON.parse(localStorage.getItem(taskCategory));
  } catch (error) {
    //handle error
  }

  //get outputs for category and result(task list)
  let resultCategory = document.getElementById('taskCategoryOutput');
  let result = document.getElementById('taskOutput');

  if (tasksArr) {
    result.innerHTML = '';
    resultCategory.innerHTML = taskCategory;

    //display taskArea
    document.getElementById('taskArea').style.display = "block";

    for (let i = 0; i < tasksArr.length; i++) {
      let title = tasksArr[i].title;
      let priority = tasksArr[i].priority;
      let category = tasksArr[i].category;
      let id = tasksArr[i].id;
      let isDone = tasksArr[i].isTaskDone;

      let taskBorder; //task border

      switch (priority) {
        case 'High':
          taskBorder = 'border border-danger';
          break;
        case 'Medium':
          taskBorder = 'border border-warning';
          break;
        case 'Low':
          taskBorder = 'border border-info';
          break;
      }

      result.innerHTML +=
        `
          <li id="${id}" data-id-number="${id}" data-task-category="${category}" class="list-group-item mb-3 taskItem ${category} ${taskBorder}">${title}
            <div class="btn-group float-right">
              <button data-id-number="${id}" class="btn btn-secondary doneTask actionBtn">Done</button>
              <button data-id-number="${id}" class="btn btn-danger deleteTask actionBtn">Delete</button>
            </div>
          </li>
        `;
      crossThroughTask(id, isDone);
    }
  } else {
    //hide taskArea
    document.getElementById('taskArea').style.display = "none";
  }
}

function crossThroughTask(id, isDone) {
  let currentTask = document.getElementById(id);
  let taskCategory;

  if (isDone) {
    currentTask.style.textDecoration = "line-through";
  } else {
    currentTask.style.textDecoration = "none";
  }
}

function doneTask(clickedTask, clickedButton) {
  let buttonId = clickedButton.getAttribute('data-id-number');
  let clickedTaskId = clickedTask.getAttribute('data-id-number');
  let category = clickedTask.getAttribute('data-task-category');
  let isDone; //boolean

  let taskArr = [];

  switch (category) {
    case 'homeTasks':
      taskArr = JSON.parse(localStorage.getItem('homeTasks'));

      for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].id === clickedTaskId) {
          isDone = taskArr[i].isTaskDone = true;

          localStorage.setItem('homeTasks', JSON.stringify(taskArr));
          crossThroughTask(clickedTaskId, isDone);
        }
      }
      break;
    case 'workTasks':
      taskArr = JSON.parse(localStorage.getItem('workTasks'));

      for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].id === clickedTaskId) {
          isDone = taskArr[i].isTaskDone = true;

          localStorage.setItem('workTasks', JSON.stringify(taskArr));
          crossThroughTask(clickedTaskId, isDone);
        }
      }
      break;
    case 'otherTasks':
      taskArr = JSON.parse(localStorage.getItem('otherTasks'));

      for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].id === clickedTaskId) {
          isDone = taskArr[i].isTaskDone = true;

          localStorage.setItem('otherTasks', JSON.stringify(taskArr));
          crossThroughTask(clickedTaskId, isDone);
        }
      }
      break;
  }
  fetchList(category);
}

function deleteTask(clickedTask, clickedButton) {
  let buttonId = clickedButton.getAttribute('id');
  let clickedTaskId = clickedTask.getAttribute('id');
  let category = clickedTask.getAttribute('data-task-category');

  let taskArr = [];
  let taskCategory = "";

  clickedTask.classList.add("bg-danger");

  setTimeout(function() {
    switch (category) {
      case 'homeTasks':
        taskArr = JSON.parse(localStorage.getItem('homeTasks'));

        for (let i = 0; i < taskArr.length; i++) {
          if (taskArr[i].id === clickedTaskId) {
            taskArr.splice(taskArr[i], 1); //remove matched element
            localStorage.setItem('homeTasks', JSON.stringify(taskArr));
          }
        }
        break;
      case 'workTasks':
        taskArr = JSON.parse(localStorage.getItem('workTasks'));

        for (let i = 0; i < taskArr.length; i++) {
          if (taskArr[i].id === clickedTaskId) {
            taskArr.splice(taskArr[i], 1); //remove matched element
            localStorage.setItem('workTasks', JSON.stringify(taskArr));
          }
        }
        break;
      case 'otherTasks':
        taskArr = JSON.parse(localStorage.getItem('otherTasks'));
        taskCategory = 'otherTasks';

        for (let i = 0; i < taskArr.length; i++) {
          if (taskArr[i].id === clickedTaskId) {
            taskArr.splice(taskArr[i], 1); //remove matched element
            localStorage.setItem('otherTasks', JSON.stringify(taskArr));
          }
        }
        break;
    }
    cleanLocalStorage(category);
    fetchList(category);
    fetchTaskCount();
  }, 500);
}

function cleanLocalStorage(category) {
  let taskArr = JSON.parse(localStorage.getItem(category));

  if (!taskArr.length) {
    localStorage.removeItem(category);
  }
}

function avoidSpacedString() {
  //detect spaced string
  let taskTitle = document.getElementById('taskTitle').value;

  if (!taskTitle.replace(/\s/g, '').length) {
    alert('Empty spaces? Nope.');
    return false;
  }
  return true;
}

function fetchTaskCount() {
  //count home tasks
  let homeTaskArr = JSON.parse(localStorage.getItem('homeTasks')) || [];
  let workTaskArr = JSON.parse(localStorage.getItem('workTasks')) || [];
  let otherTasksArr = JSON.parse(localStorage.getItem('otherTasks')) || [];

  let homeTaskCount = homeTaskArr.length;
  let workTaskCount = workTaskArr.length;
  let otherTaskCount = otherTasksArr.length;

  //fetch badges
  let homeTaskCounter = document.getElementById('homeTaskCounter');
  let workTaskCounter = document.getElementById('workTaskCounter');
  let otherTaskCounter = document.getElementById('otherTaskCounter');

  homeTaskCounter.innerHTML = homeTaskCount;
  workTaskCounter.innerHTML = workTaskCount;
  otherTaskCounter.innerHTML = otherTaskCount;
}
