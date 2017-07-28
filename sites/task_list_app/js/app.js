// An application for tracking tasks through to completion.

const taskInput = document.getElementById("new-task"),
      addButton = document.getElementsByTagName("button")[0], //first button
      incompleteTasksHolder = document.getElementById("incomplete-tasks"), //incomplete-tasks
      completedTasksHolder= document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
createNewTaskElement = (taskString) => {
  //Create List Item
  const listItem = document.createElement("li"),
        checkBox = document.createElement("input"),
        label = document.createElement("label"),
        editInput = document.createElement("input"), 
        editButton = document.createElement("button"),
        deleteButton = document.createElement("button");
  
  //Each element needs modifying  
  checkBox.type = "checkbox";
  editInput.type = "text";  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";  
  label.innerText = taskString;
  
  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Add a new task
addTask = () => {
  //Create a new list item with the text from #new-task:
  const listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  taskInput.value = "";
}

//Edit an existing task
const editTask = function() {
  const listItem = this.parentNode,
        editInput = listItem.querySelector("input[type=text"),
        label = listItem.querySelector("label")
        containsClass = listItem.classList.contains("editMode");
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
  
}

//Delete an existing task
const deleteTask = function() {
  const listItem = this.parentNode,
        ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
const taskCompleted = function() {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
const taskIncomplete = function() {
  //Append the task list item to the #incomplete-tasks
  const listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  const checkBox = taskListItem.querySelector("input[type=checkbox]"),
        editButton = taskListItem.querySelector("button.edit"),
        deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

//TODO Get/Save func
const ajaxRequest = () => {
  console.log("AJAX request");
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
/* addButton.addEventListener("click", ajaxRequest); */

//cycle over incompleteTasksHolder ul list items
for(let i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for(let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

































