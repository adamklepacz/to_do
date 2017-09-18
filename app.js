//create event listener for submiting a form
document.getElementById('createTaskForm').addEventListener('submit', saveTask);

//create event listeneres for "check task" section
document.getElementById('showHomeTasks').addEventListener('click', function(){
    fetchList('homeTasks');
}, true);
document.getElementById('showWorkTasks').addEventListener('click', function(){
	fetchList('workTasks');
}, true);
document.getElementById('showOtherTasks').addEventListener('click', function(){
	fetchList('otherTasks');
}, true);

//crete event listener for document
document.addEventListener('click', handleEvent, true);

//hide taskArea at the very begining
document.getElementById('taskArea').style.display = "none";

function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
		text += Math.floor(Math.random() * 99999);
	console.log(text);
  return text;
}

//handle event for multiple done and delete buttons
function handleEvent(e) {
	//event for IE
	e = event || window.event;
	e.target = e.target || e.srcElement;
	
	//get clicked <button>
	let clickedButton = e.target;
	
	//get clicked task <li>
	let clickedTask = e.target.closest('li.taskItem');
	
	//Climb up the document tree from the target of event
	while(clickedButton) {
		if(clickedButton.nodeName === "BUTTON" && /doneTask/.test(clickedButton.className)) {
			//user click on a <button> or on an element inside a <button>
			//with class of ".doneTask"
			doneTask(clickedTask, clickedButton);
			break;
		}
		if(clickedButton.nodeName === "BUTTON" && /deleteTask/.test(clickedButton.className)) {
			//user click on a <button> or on an element inside a <button>
			//with class of ".deleteTask"
			//deleteTask(element);
			console.log(clickedButton,'execute deleteTask function');
			break;
		}
		clickedButton = clickedButton.parentNode;
	}
}

function saveTask(e) {
	//prevent form from submitting
	e.preventDefault();
	
	//display taskArea
	document.getElementById('taskArea').style.display = "block";
	
	//get task title, priority and category
	let taskTitle = document.getElementById('taskTitle').value,
			taskPriority = document.getElementById('taskPriority').value,
			taskCategory = document.getElementById('taskCategory').value,
			itemKey = '',
			taskId = makeId(),
			isTaskDone = false;
			console.log(taskId);
			
	//get form
			myForm = document.getElementById('createTaskForm');
	
	//init empty object for storing a task
	let newTask = {};
	
	//add task postfix to category
	taskCategory += "Task";
	
	//set title, priority and category to newTask object
	newTask = {
		title: taskTitle,
		priority: taskPriority,
		category: taskCategory,
		id: taskId,
		isTaskDone: isTaskDone //boolean
	};
	
	//check category of newTask
	if(newTask.category === "HomeTask") {
		itemKey = 'homeTasks';
	} else if(newTask.category === "WorkTask") {
		itemKey = 'workTasks';
	} else if(newTask.category === "OtherTask") {
		itemKey = 'otherTasks';
	}
	
	console.log('itemKey: ', itemKey);
	
	//initialize empty arrays to store tasks 
	let homeTasksArr = [],
			workTaskArr = [],
			otherTaskArr = [];
	
	
	//If in localstorage there is NO item like
	//homeTasks or
	//workTasks or
	//otherTasks
	if(localStorage.getItem(itemKey) === null) {
		//check if new task category is identical to "Home"
		//and init homeTaskArr to store home tasks data
		if(newTask.category === "HomeTask") {
			//init home task array
			homeTasksArr = [];
			
			//push newTask to home task array
			homeTasksArr.push(newTask)
			
			//convert homeTaskArr(array) to string and set it up to localstorage
			//using JSON data format
			localStorage.setItem('homeTasks', JSON.stringify(homeTasksArr));
			console.log('Operation save new HOME TASK succeed!');
		}
		//check if new task category is idetical to "Work"
		//and init workTaskArr to store work tasks data
		if(newTask.category === "WorkTask") {
			//init work task array
			workTaskArr = [];
			
			//push newTask to home task array
			workTaskArr.push(newTask);
			
			//convert workTaskArr to string and set it up to localstorage
			//using JSON data format
			localStorage.setItem('workTasks', JSON.stringify(workTaskArr));
			console.log('Operation: save new WORK TASK succeed!');
		}
		//check if new task category is identical to "Other"
		//and init otherTaskArr to store other tasks data
		if(newTask.category === "OtherTask") {
			//init other task array
			otherTaskArr = [];
			
			//push newTask to home task array
			otherTaskArr.push(newTask);
			
			//convert otherTaskArr to string and set it up to localstorage
			//using JSON data format
			localStorage.setItem('otherTasks', JSON.stringify(otherTaskArr));
			console.log('Operation: save new OTHER TASK succeed!');
		}
		//Else if there is something in localstorage
	} else { 
		//check if new task category is identical to "Home"
		//and parse JSON data to array
		//cause we need array format to push newTask there
		if(newTask.category === "HomeTask") {
			//parse string stored in localstorage to array/convert string to an array
			homeTasksArr = JSON.parse(localStorage.getItem('homeTasks'));
			
			//push new task to home task array
			homeTasksArr.push(newTask);
			
			//re-set it up to local storage
			localStorage.setItem('homeTasks', JSON.stringify(homeTasksArr));
			console.log("There was homeTasks before. New task added");
		}
		//check if new task category is idetical to "Work"
		//and parse JSON data to array
		//cause we need array format to push newTask there
		if(newTask.category === "WorkTask") {
			//parse string stored in localstorage to array/convert string to an array
			workTaskArr = JSON.parse(localStorage.getItem('workTasks'));
			
			//push new task to work task array
			workTaskArr.push(newTask);
			
			//re-set it up to local storage
			localStorage.setItem('workTasks', JSON.stringify(workTaskArr));
			console.log("There was workTasks before. New task added");
		}
		//check if new task category is idetical to "Other"
		//and parse JSON data to array
		//cause we need array format to push newTask there
		if(newTask.category === "OtherTask") {
			//parse string stored in localstorage to array/convert string to an array
			otherTaskArr = JSON.parse(localStorage.getItem('otherTasks'));
			
			//push new task to other task array/ add new task
			otherTaskArr.push(newTask);
			
			//re-set it up to local storage
			localStorage.setItem('otherTasks', JSON.stringify(otherTaskArr));
			console.log("There was otherTasks before. New task added");
		}
	} // end of else
	
	//reset form after submiting
	myForm.reset();
	
	//fetch list
	fetchList(itemKey);
}

//fetch list using itemKey form localstorage
function fetchList(itemKey) {
	//display taskArea
	document.getElementById('taskArea').style.display = "block";
	
	//get taskArr from localstorage
	let tasksArr = JSON.parse(localStorage.getItem(itemKey)),
	
	//get task output element
			resultCategory = document.getElementById('taskCategoryInner'),
			result = document.getElementById('taskOutput'),
			
			
	//Result category inner html
			resultCategoryInnerHtml = tasksArr[0].category;
	
	//init empty "place" for results
	resultCategory.innerHTML = resultCategoryInnerHtml;
	result.innerHTML = '';
	
	//loop over taskArr elements 
	for(let i = 0; i < tasksArr.length; i++) {
		let title = tasksArr[i].title,
				priority = tasksArr[i].priority,
				category = tasksArr[i].category,
				id = tasksArr[i].id,
				isDone = tasksArr[i].isTaskDone;
		console.log('task is done', isDone);

		result.innerHTML +=
				`
					<li id="${id}" class="list-group-item mb-3 taskItem ${category}">${title}
						<div class="btn-group float-right">
							<button id="${id}" class="btn btn-secondary doneTask">Done</button>
							<button id="${id}" class="btn btn-danger deleteTask">Delete</button>
						</div>
					</li>
				`;
		
		//get currentTask
		let currentTask = document.getElementById(id);
		console.log('CurrentTask:', currentTask);
		
		//check if task is done
		if(isDone) {
			currentTask.style.textDecoration = "line-through";
		} else {
			currentTask.style.textDecoration = "none";	
		}
	}
	console.log("END OF FETCH FUNCTION");
}

function doneTask(clickedTask, element) {
	//check if task id is euqal to id of clicked done button
	//and cross text which is inside <li> tag
	let buttonId = element.getAttribute('id'),
			clickedTaskId = clickedTask.getAttribute('id'),
			doneElement = document.getElementById(clickedTaskId);
	
	//check if clickedTask belongs to HomeTask category
	if(clickedTask.classList.contains('HomeTask')) {
		//get object form localstorage
		let tasksArr = JSON.parse(localStorage.getItem('homeTasks'));
		
		//set isDone property to true
		for(let i = 0; i < tasksArr.length; i++) {
			tasksArr[i].isTaskDone = true;	
		}
		localStorage.setItem('homeTasks', JSON.stringify(tasksArr));
	}
	//check if clickedTask belongs to WorkTask catogory
	if(clickedTask.classList.contains('WorkTask')) {
		//get object form localstorage
		let tasksArr = JSON.parse(localStorage.getItem('workTasks'));
		
		//set isDone property to true
		for(let i = 0; i < tasksArr.length; i++) {
			tasksArr[i].isTaskDone = true;	
		}
		localStorage.setItem('workTasks', JSON.stringify(tasksArr));
	}
	//check if clicked belongs to WorkTask category
	if(clickedTask.classList.contains('WorkTask')) {
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
