//create event listener for submiting a form
document.getElementById('createTaskForm').addEventListener('submit', saveTask);
document.getElementById('taskArea').style.display = "none";

function saveTask(e) {
	//prevent form from submitting
	e.preventDefault();
	
	//display taskArea
	document.getElementById('taskArea').style.display = "block";
	
	//get task title, priority and category
	let taskTitle = document.getElementById('taskTitle').value,
			taskPriority = document.getElementById('taskPriority').value,
			taskCategory = document.getElementById('taskCategory').value,
			itemKey = '';
			
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
	
	//check category of newTask
	if(newTask.category === "Home") {
		itemKey = 'homeTasks';
	} else if(newTask.category === "Work") {
		itemKey = 'workTasks';
	} else if(newTask.category === "Other") {
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
		if(newTask.category === "Home") {
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
		if(newTask.category === "Work") {
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
		if(newTask.category === "Other") {
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
		if(newTask.category === "Home") {
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
		if(newTask.category === "Work") {
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
		if(newTask.category === "Other") {
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
	let tasksArr = JSON.parse(localStorage.getItem(itemKey)),
	
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
