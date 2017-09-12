//create event listener for submiting a form
document.getElementById('createTaskForm').addEventListener('submit', saveTask);

function saveTask(e) {
	//prevent form from submitting
	e.preventDefault();
	
	//get task title, priority and category
	let taskTitle = document.getElementById('taskTitle').value,
			taskPriority = document.getElementById('taskPriority').value,
			taskCategory = document.getElementById('taskCategory').value,
			
	//get form
			myForm = document.getElementById('createTaskForm');
	
	//init empty object for storing a task
	let newTask = {};
	
	//set title, priority and category to newTask object
	newTask = {
		title: taskTitle,
		priority: taskPriority,
		category: taskCategory
	};
	
	//initialize empty array to store tasks 
	let tasksArr = [];
	//set data to local storage
	if(localStorage.getItem('tasks') === undefined) {
		//init taskArr
		tasksArr = [];
		
		//push newTask to taskArr(array)
		tasksArr.push(newTask);
		console.log(tasksArr);
		
		//convert array to string a set it up to localstorage
		localStorage.setItem('tasks', JSON.stringify(tasksArr));
	} else {
		//parse string stored in localstorage to array/convert string to an array
		tasksArr = JSON.parse(localStorage.getItem('tasks')) || [];
		
		//push newTask to taskArr(array)
		tasksArr.push(newTask);
		
		//re-set localstorage with new task 
		localStorage.setItem('tasks', JSON.stringify(tasksArr));
	}
	
	//reset form after submiting
	myForm.reset();
	
	//fetch list
	fetchList(newTask);
}

//fetch list using data from localStorage
function fetchList(newTask) {
	let tasksArr = JSON.parse(localStorage.getItem('tasks')),
	
	//get task output element
			result = document.getElementById('taskOutput');
	
	//init empty "place" for result
	result.innerHTML = '';
	
	//loop over taskArr elements 
	for(let i = 0; i < tasksArr.length; i++) {
		let title = tasksArr[i].title,
				priority = tasksArr[i].priority,
				category = tasksArr[i].category;
		
		result.innerHTML +=
				`
					<li class="list-group-item mb-3">${title}
						<div class="btn-group float-right">
							<button class="btn btn-secondary">Done</button>
							<button class="btn btn-danger">Delete</button>
						</div>
					</li>
				`;
	}
	
	/*
	//fetch home tasks
	if(newTask.category === "Home") {
		
		
		//get tasks from localstorage
		let homeTaskArr = JSON.parse(localStorage.getItem('tasks'));
		
		//get html outpu element 
		let result = document.getElementById('taskOutpu');
		
		//init empty place/string for result
		result.innerHTML = '';
		
		//loop over all homeTaskArr
		for(let i = 0; i < homeTaskArr.length; i++) {
			let title = homeTaskArr[i].title,
					category = homeTaskArr[i].category,
					priority = homeTaskArr[i].category;
		}
		
	}
	
	//work tasks
	if(tasks.category === "Work") {
		let workTasks = {
			title: tasks.title,
			priority: tasks.priority,
			category: tasks.category
		}
	}
	
	//Other tasks
	if(tasks.category === "Other") {
		let otherTasks = {
			title: tasks.title,
			priority: tasks.priority,
			category: tasks.category
		}
	}
  */
	console.log("END OF FETCH FUNCTION");
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
