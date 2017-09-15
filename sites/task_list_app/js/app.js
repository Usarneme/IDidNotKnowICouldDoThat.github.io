// An application for tracking tasks through to completion.

// DOM elements used globally
var taskInput = document.getElementById("new-task"),
    addButton = document.getElementById("add"), 
    saveButton = document.getElementById("save"),
    retrieveButton = document.getElementById("retrieve"),
    incompleteTasksHolder = document.getElementById("incomplete-tasks"), 
    completedTasksHolder= document.getElementById("completed-tasks");

/* New Task List List Item {li} created and returned */
createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li"),
      label = document.createElement("label"),
      editInput = document.createElement("input"), 
      editButton = document.createElement("button"),
      deleteButton = document.createElement("button"),
      checkBox = document.createElement("input"),
      span = document.createElement("span");
      
  // Modify each element before appending  
  label.innerText = taskString;
  editInput.type = "text"; 
  editInput.disabled = true;
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";  
  checkBox.type = "checkbox";
  span.innerText = "DONE";
  
  // Append each element to the generated list item
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(checkBox);
  listItem.appendChild(span);
  
  return listItem;
}

/* Add a new task to the incomplete tasks list */
addTask = function() {
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  //Bind events to the newly created item (edit/delete/completed)
  bindTaskEvents(listItem, taskCompleted);  
  //Clear out the Add new input field
  taskInput.value = "";
}

/* Edit an existing task */
editTask = function() {
  var listItem = this.parentNode,
      editInput = listItem.querySelector("input[type=text]"),
      label = listItem.querySelector("label"),
      inEditMode = listItem.classList.contains("editMode"),
      editButton = listItem.querySelector("button");
  //if the class of the parent is in .editMode
  if(inEditMode) {
    //label text become the input's value
    label.innerText = editInput.value;
    editInput.value = '';
    editInput.disabled = true;
    editButton.innerText = 'Edit';
//    console.log('Saving');
  } else {
    //input value becomes the label's text
    editInput.value = label.innerText;
    label.innerText = editInput.value+' (editing)...';
    editInput.disabled = false;
    editButton.innerText = 'Save';
//    console.log('Editing');
  }
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
}

/* Delete an existing task */
deleteTask = function() {
  var listItem = this.parentNode,
        ul = listItem.parentNode;
  // Remove the parent list item from the ul
  ul.removeChild(listItem);
}

/* Mark a task as complete */
taskCompleted = function() {
  // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

/* Mark a task as incomplete */
taskIncomplete = function() {
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

/* Saves all current tasks (completed and incomplete) to localStorage if available
   alert pops up if localStorage is not available to warn the user. */
saveTasks = function() {
  // If they are still working on a task (editMode enabled on any task list item)
  if(document.getElementsByClassName('editMode').length > 0) {
    // Deny the save and alert the user
    alert('Please hit the save button on all tasks in progress. Then I will be able to save your task list for future use on this device.');
  } else {
    // All is well. Save to local storage. 
    var completedTasksArray = completedTasksHolder.innerHTML || [],
    incompleteTasksArray = incompleteTasksHolder.innerHTML || [];

    if (storageAvailable('localStorage')) {
      //Store completed tasks (if there is at least 1+ completed list item...)
      if(completedTasksArray.length > 0) {
        localStorage.setItem('completedTasks', completedTasksArray);
      }
      //Store incomplete tasks
      if(incompleteTasksArray.length > 0) {
        localStorage.setItem('incompleteTasks', incompleteTasksArray);
      }
      console.log("Tasks saved to localStorage");
      console.dir(localStorage);
    } else {
      //Warn user localstorage is not available
      alert('Sorry, storage is not available on your device. Try another browser?');
    }
  }
}

/* Retrieve all tasks from localStorage (completed and incomplete) */
retrieveTasks = function() {
  if(storageAvailable('localStorage')) {
    console.log('Retrieveing local storage.');
    if(localStorage.completedTasks) {
      completedTasksHolder.innerHTML = localStorage.getItem('completedTasks');
      // For each completed task list item retrieved and rendered...
      for(var i=0; i<completedTasksHolder.children.length; i++) {
        // Check the boxes for those that were already completed
        completedTasksHolder.children[i].getElementsByTagName("input")[0].checked = true;        
      }
    }
    if(localStorage.incompleteTasks) {
      incompleteTasksHolder.innerHTML = localStorage.getItem('incompleteTasks');
    }
    // Apply event handlers for Edit/Delete buttons and Completed checkbox elements
    clickHandler();
  } else {
    //Warn user localstorage is not available
    alert('Sorry, storage is not available on your device. Try another browser?');
  }    
}

/* Returns true if localStorage is implemented and available in a given browser 
*  From the Web Storage API/MDN entry: 
*  https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API */
storageAvailable = function(type) {
  try {
    var storage = window[type],
          x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}

/* EVENT HANDLERS */

/* Call-able click handler function applies the appropriate 
   behavior/functionality to each element in each task list 
   (completed & incomplete) */
clickHandler = function() {
  //Cycle over incompleteTasksHolder ul list items
  for(var i=0; i<incompleteTasksHolder.children.length; i++) {
    //Bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  //Cycle over completedTasksHolder ul list items
  for(var i=0; i<completedTasksHolder.children.length; i++) {
    //Bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
}

/* Event bindings for an individual task and it's children elements */
bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]"),
      editButton = taskListItem.querySelector("button.edit"),
      deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

/* Load existing tasks at startup if available */
if(storageAvailable && localStorage.completedTasks) {
  // Immediately invoked function expression to retrieve tasks
  (function() { retrieveTasks() })();
}
/* One time click handlers at startup for Add, Save, and Retrieve buttons */
addButton.addEventListener("click", addTask);
saveButton.addEventListener("click", saveTasks);
retrieveButton.addEventListener("click", retrieveTasks);
// Add event handlers for the "default" events at startup
clickHandler();
