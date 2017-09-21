/* TO-DO APP 
** Author: Adam Klepacz
** Playground app in plain JS
** 2017
*/

document.getElementById('creationTaskForm').addEventListener('submit', saveTask);

//event listeneres for "check task" section
document.getElementById('showHomeTasks').addEventListener('click', function(){
	fetchList('homeTasks');
}, true);
document.getElementById('showWorkTasks').addEventListener('click', function(){
	fetchList('workTasks');
}, true);
document.getElementById('showOtherTasks').addEventListener('click', function(){
	fetchList('otherTasks');
}, true);

//event listeners to handle multiple "delete" and "done" buttons
document.addEventListener('click', handleTaskDone, true);
document.addEventListener('click', handleTaskDelete, true);

//hide taskArea element at the very beginning
document.getElementById('taskArea').style.display = "none";

fetchTaskCount();

//unique id for task
function makeId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
		text += Math.floor(Math.random() * 99999);
	}
  return text;
}

function handleTaskDelete(e) {
	//event for IE
	e = event || window.event;
	e.target = e.target || e.srcElement;
	
	let clickedButton = e.target,
			clickedTask = e.target.closest('li.taskItem');
	
	//Climb up the document tree, check if clickedButton is a <button> and 
	//does it have deleteTask class
	while(clickedButton) {
		if(clickedButton.nodeName === "BUTTON" && /deleteTask/.test(clickedButton.className)) {
			deleteTask(clickedTask, clickedButton);
			break;
		}
		clickedButton = clickedButton.parentNode;
	}
}

function handleTaskDone(e) {
	//event for IE
	e = event || window.event;
	e.target = e.target || e.srcElement;
	
	let clickedButton = e.target,
			clickedTask = e.target.closest('li.taskItem');
	
	//Climb up the document tree, check if clickedButton is a <button> and
	//does it have doneTask class
	while(clickedButton) {
		if(clickedButton.nodeName === "BUTTON" && /doneTask/.test(clickedButton.className)) {
			doneTask(clickedTask, clickedButton);
			break;
		}
		clickedButton = clickedButton.parentNode;
	}
}

function saveTask(e) {
	e.preventDefault(); //prevent page reload
	
	if(avoidSpacedString()) {
		document.getElementById('taskArea').style.display = "block";
	
		let taskTitle = document.getElementById('taskTitle').value,
				taskPriority = document.getElementById('taskPriority').value,
				taskCategory = document.getElementById('taskCategory').value += "Tasks",
				taskId = makeId(),
				isTaskDone = false, //on the very beginning newTask is always NOT DONE(false)

				creationTaskForm = document.getElementById('creationTaskForm'),

				newTask = {};	//init empty object for storing new task

		newTask = {
			title: taskTitle,
			priority: taskPriority,
			category: taskCategory,
			id: taskId,
			isTaskDone: isTaskDone //boolean
		};


		let homeTasksArr = [],
				workTaskArr = [],
				otherTaskArr = [];


		//if localStorage is empty
		if(localStorage.getItem(taskCategory) === null) {
			if(newTask.category === "homeTasks") {
				homeTasksArr = [];
				homeTasksArr.push(newTask)

				//convert homeTaskArr(array) to string and set it up to localStorage
				localStorage.setItem('homeTasks', JSON.stringify(homeTasksArr));
			}
			if(newTask.category === "workTasks") {
				workTaskArr = [];
				workTaskArr.push(newTask);

				//convert workTaskArr to string and set it up to localstorage
				localStorage.setItem('workTasks', JSON.stringify(workTaskArr));
			}
			if(newTask.category === "otherTasks") {
				otherTaskArr = [];
				otherTaskArr.push(newTask);

				//convert otherTaskArr to string and set it up to localstorage
				localStorage.setItem('otherTasks', JSON.stringify(otherTaskArr));
			}
		} else { //if there is something in localStorage 
			if(newTask.category === "homeTasks") {
				//parse string stored in localstorage to array
				homeTasksArr = JSON.parse(localStorage.getItem('homeTasks'));
				homeTasksArr.push(newTask); //push new task

				//re-set it up to local storage
				localStorage.setItem('homeTasks', JSON.stringify(homeTasksArr));
			}
			if(newTask.category === "workTasks") {
				//parse string stored in localstorage to array
				workTaskArr = JSON.parse(localStorage.getItem('workTasks'));
				workTaskArr.push(newTask); //push new task

				//re-set it up to local storage
				localStorage.setItem('workTasks', JSON.stringify(workTaskArr));
			}
			if(newTask.category === "otherTasks") {
				//parse string stored in localstorage to array
				otherTaskArr = JSON.parse(localStorage.getItem('otherTasks'));
				otherTaskArr.push(newTask); //push new task

				//re-set it up to local storage
				localStorage.setItem('otherTasks', JSON.stringify(otherTaskArr));
			}
		} 
		
		fetchList(taskCategory);
		
	}	else {
		return;
	}
	creationTaskForm.reset();
	fetchTaskCount();
}

//fetch list using itemKeyCategory form localstorage
function fetchList(taskCategory) {
	let tasksArr = JSON.parse(localStorage.getItem(taskCategory)),
	
	//get outputs for category and result(task list)
			resultCategory = document.getElementById('taskCategoryOutput'),
			result = document.getElementById('taskOutput');
			
	if(tasksArr) {
		result.innerHTML = '';
		resultCategory.innerHTML = taskCategory;
		
		//display taskArea
		document.getElementById('taskArea').style.display = "block";
		
		for(let i = 0; i < tasksArr.length; i++) {
			let title = tasksArr[i].title,
					priority = tasksArr[i].priority, //will be used later to colorize task background
					category = tasksArr[i].category,
					id = tasksArr[i].id,
					isDone = tasksArr[i].isTaskDone,
					
					taskBorder;  //task border
					
			//check priority and set border color
			if(priority === "High") taskBorder = 'border border-danger';
			if(priority === "Medium") taskBorder = 'border border-warning';
			if(priority === "Low") taskBorder = 'border border-info';
			
			result.innerHTML +=
					`
						<li id="${id}" class="list-group-item mb-3 taskItem ${category} ${taskBorder}">${title}
							<div class="btn-group float-right">
								<button id="${id}" class="btn btn-secondary doneTask">Done</button>
								<button id="${id}" class="btn btn-danger deleteTask">Delete</button>
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
	let currentTask = document.getElementById(id),
			taskCategory;
	
	if(isDone) {
		currentTask.style.textDecoration = "line-through";
	} else {
		currentTask.style.textDecoration = "none";	
	}
}

function doneTask(clickedTask, clickedButton) {
	let buttonId = clickedButton.getAttribute('id'),
			clickedTaskId = clickedTask.getAttribute('id'),
			isDone, //boolean
	
			taskArr = [],
			taskCategory = "";
	
	if(clickedTask.classList.contains('homeTasks')) {
		taskArr = JSON.parse(localStorage.getItem('homeTasks'));
		taskCategory = 'homeTasks';
		
		for(let i = 0; i < taskArr.length; i++) {
			if(taskArr[i].id === clickedTaskId) {
				isDone =	taskArr[i].isTaskDone = true;
				
				localStorage.setItem('homeTasks', JSON.stringify(taskArr));
				crossThroughTask(clickedTaskId, isDone);
			}
		}
	}
	
	if(clickedTask.classList.contains('workTasks')) {
		taskArr = JSON.parse(localStorage.getItem('workTasks'));
		taskCategory = 'workTasks';
		
		for(let i = 0; i < taskArr.length; i++) {
			if(taskArr[i].id === clickedTaskId) {
				isDone = taskArr[i].isTaskDone = true;
				
				localStorage.setItem('workTasks', JSON.stringify(taskArr));
				crossThroughTask(clickedTaskId, isDone);
			}
		}
	}
	
	if(clickedTask.classList.contains('otherTasks')) {
		taskArr = JSON.parse(localStorage.getItem('otherTasks'));
		taskCategory = 'otherTasks';
		
		for(let i = 0; i < taskArr.length; i++) {
			if(taskArr[i].id === clickedTaskId) {
				isDone = taskArr[i].isTaskDone = true;
				
				localStorage.setItem('otherTasks', JSON.stringify(taskArr));
				crossThroughTask(clickedTaskId, isDone);
			}
		}
	}
	fetchList(taskCategory);
}

/* TO-DO
** Remove empty object from 
** localStorage when taskArr is empty
*/
function	deleteTask(clickedTask, clickedButton) {
	let buttonId = clickedButton.getAttribute('id'),
			clickedTaskId = clickedTask.getAttribute('id'),
			
			taskArr = [],
			taskCategory = "";
	
	clickedTask.classList.add("bg-danger");
	
	setTimeout(function() {
			if(clickedTask.classList.contains('homeTasks')) {
		taskArr = JSON.parse(localStorage.getItem('homeTasks'));
		taskCategory = 'homeTasks';
		
		for(let i = 0; i < taskArr.length; i++) {
			if(taskArr[i].id === clickedTaskId) {
				taskArr.splice(taskArr[i], 1); //remove matched element
				localStorage.setItem('homeTasks', JSON.stringify(taskArr));
			}
		}
	}
	
	if(clickedTask.classList.contains('workTasks')) {
		taskArr = JSON.parse(localStorage.getItem('workTasks'));
		taskCategory = 'workTasks';
		
		for(let i = 0; i < taskArr.length; i++) {
			if(taskArr[i].id === clickedTaskId) {
				taskArr.splice(taskArr[i], 1); //remove matched element
				localStorage.setItem('workTasks', JSON.stringify(taskArr));
			}
		}
	}
	
	if(clickedTask.classList.contains('otherTasks')) {
		taskArr = JSON.parse(localStorage.getItem('otherTasks'));
		taskCategory = 'otherTasks';
		
		for(let i = 0; i < taskArr.length; i++) {
			if(taskArr[i].id === clickedTaskId) {
				taskArr.splice(taskArr[i], 1); //remove matched element
				localStorage.setItem('otherTasks', JSON.stringify(taskArr));
			}
		}
	}
	cleanLocalStorage(taskCategory);
	fetchList(taskCategory);
	fetchTaskCount();
	}, 500);
}

function cleanLocalStorage(taskCategory) {
	let taskArr = JSON.parse(localStorage.getItem(taskCategory));
	
	if(!taskArr.length) {
		localStorage.removeItem(taskCategory);
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
	let homeTaskArr = JSON.parse(localStorage.getItem('homeTasks')) || [],
			workTaskArr = JSON.parse(localStorage.getItem('workTasks')) || [],
			otherTasksArr = JSON.parse(localStorage.getItem('otherTasks')) || [],
			
			homeTaskCount = homeTaskArr.length,
			workTaskCount = workTaskArr.length,
			otherTaskCount = otherTasksArr.length;
	
	//fetch badges
	let homeTaskCounter = document.getElementById('homeTaskCounter'),
			workTaskCounter = document.getElementById('workTaskCounter'),
			otherTaskCounter = document.getElementById('otherTaskCounter');
	
	homeTaskCounter.innerHTML = homeTaskCount;
	workTaskCounter.innerHTML = workTaskCount;
	otherTaskCounter.innerHTML = otherTaskCount;
}