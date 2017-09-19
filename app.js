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

//unique id for task
function makeId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
		text += Math.floor(Math.random() * 99999);
	}
	console.log(text);
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
	creationTaskForm.reset();
	
	fetchList(taskCategory);
}

//fetch list using itemKeyCategory form localstorage
function fetchList(taskCategory) {
	let tasksArr = JSON.parse(localStorage.getItem(taskCategory)),
	
	//get outputs for category and result(task list)
			resultCategory = document.getElementById('taskCategoryOutput'),
			result = document.getElementById('taskOutput');
			
	result.innerHTML = '';
	
	if(tasksArr) {
		//display taskArea
		document.getElementById('taskArea').style.display = "block";
		
		resultCategory.innerHTML = taskCategory;
		
		for(let i = 0; i < tasksArr.length; i++) {
			let title = tasksArr[i].title,
					priority = tasksArr[i].priority, //will be used later to colorize task background
					category = tasksArr[i].category,
					id = tasksArr[i].id,
					isDone = tasksArr[i].isTaskDone;
		 
			/* TO-DO
			** colorize task background
			** color based on task priority
			*/
			result.innerHTML +=
					`
						<li id="${id}" class="list-group-item mb-3 taskItem ${category}">${title}
							<div class="btn-group float-right">
								<button id="${id}" class="btn btn-secondary doneTask">Done</button>
								<button id="${id}" class="btn btn-danger deleteTask">Delete</button>
							</div>
						</li>
					`;
			crossThroughTask(id, isDone);
		}
	}
}

function crossThroughTask(id, isDone) {
	let currentTask = document.getElementById(id);
	
	if(isDone) {
		currentTask.style.textDecoration = "line-through";
	} else {
		currentTask.style.textDecoration = "none";	
	}
}

/* TODO
** Naprawić funkcje żeby przekreślała tylko kliknięty task a nie 
** wszystkie na liście
*/
function doneTask(clickedTask, element) {
	//check if task id is euqal to id of clicked done button
	//and cross text which is inside <li> tag
	let buttonId = element.getAttribute('id'),
			clickedTaskId = clickedTask.getAttribute('id'),
			doneElement = document.getElementById(clickedTaskId);
	
	//check if clickedTask belongs to HomeTask category
	if(clickedTask.classList.contains('homeTasks')) {
		//get object form localstorage
		let tasksArr = JSON.parse(localStorage.getItem('homeTasks'));
		
		//set isDone property to true
		for(let i = 0; i < tasksArr.length; i++) {
			tasksArr[i].isTaskDone = true;	   //tu jest zasadniczy błąd bo idzie pętlą i we wszystkich elementach ustawia 																					//isTaskDone na true
		}
		localStorage.setItem('homeTasks', JSON.stringify(tasksArr));
	}
	//check if clickedTask belongs to WorkTask catogory
	if(clickedTask.classList.contains('workTasks')) {
		//get object form localstorage
		let tasksArr = JSON.parse(localStorage.getItem('workTasks'));
		
		//set isDone property to true
		for(let i = 0; i < tasksArr.length; i++) {
			tasksArr[i].isTaskDone = true;	
		}
		localStorage.setItem('workTasks', JSON.stringify(tasksArr));
	}
	//check if clicked belongs to WorkTask category
	if(clickedTask.classList.contains('otherTasks')) {
		//get object form localstorage
		let tasksArr = JSON.parse(localStorage.getItem('otherTasks'));
		
		//set isDone property to true
		for(let i = 0; i < tasksArr.length; i++) {
			tasksArr[i].isTaskDone = true;	
		}
		localStorage.setItem('otherTasks', JSON.stringify(tasksArr));
	}
	
	console.log('Inside doneTask: clickedTaskID',clickedTaskId,'clickedButtonID', buttonId);
	if(buttonId === clickedTaskId) {
		doneElement.style.textDecoration = "line-through";
	} else {
		//console.log('Handle other possibility...');
	}
}


	//small validation, do not store data in object when there is empty string in taskTitle
	/* TO-DO */
	//create validation function
	// I have to create here more accurate validaton rules
	// for multiple spaces 
	// for multiple numbers  e.t.c
	//	if(taskTitle == "") {
	//		return;
	//	} else {
