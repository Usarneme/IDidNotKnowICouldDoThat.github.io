// An application for tracking tasks through to completion.

// DOM elements used globally
const taskInput = document.getElementById("new-task"),
      addButton = document.getElementById("add"), 
      saveButton = document.getElementById("save"),
      retrieveButton = document.getElementById("retrieve"),
      incompleteTasksHolder = document.getElementById("incomplete-tasks"), 
      completedTasksHolder= document.getElementById("completed-tasks");

// New Task List Item li created and returned
createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li"),
        label = document.createElement("label"),
        span = document.createElement("span"),
        checkBox = document.createElement("input"),
        editInput = document.createElement("input"), 
        editButton = document.createElement("button"),
        deleteButton = document.createElement("button");
        
  // Modify each element before appending  
  label.innerText = taskString;
  span.innerText = "Complete";
  checkBox.type = "checkbox";
  editInput.type = "text"; 
  editInput.disabled = true;
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";  
  
  // Append each element to the generated list item
  listItem.appendChild(label);
  listItem.appendChild(span);
  listItem.appendChild(checkBox);
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
  //Bind events to the newly created item (edit/delete/completed)
  bindTaskEvents(listItem, taskCompleted);  
  //Clear out the Add new input field
  taskInput.value = "";
}

//Edit an existing task
editTask = function() {
  const listItem = this.parentNode,
        editInput = listItem.querySelector("input[type=text"),
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

//Delete an existing task
deleteTask = function() {
  const listItem = this.parentNode,
        ul = listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
taskCompleted = function() {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
taskIncomplete = function() {
  //Append the task list item to the #incomplete-tasks
  const listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
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

// Get/Save func
saveTasks = () => {
  const completedTasksArray = [],
        completedListItems = completedTasksHolder.getElementsByTagName('li'),
        incompleteTasksArray = [],
        incompleteListItems = incompleteTasksHolder.getElementsByTagName('li');

  dataModel = {
    completedTasks: [
      {  // Each LI consists of: LABEL-SPAN-INPUT-INPUT-BUTTON-BUTTON
        label: {
          tagName: 'label',
          innerText: 'See the Doctor'
        },
        span: {
          tagName: 'span',
          innerText: 'Complete'
        },  
        inputCheckbox: {
          tagName: 'input',
          type: 'checkbox',
          checked: true
        },
        inputText: {
          tagName: 'input',
          type: 'text',
          disabled: true
        },
        buttonEdit: {
          tagName: 'button',
          class: 'edit',
          innerText: 'Edit'
        },
        buttonDelete: {
          tagName: 'button',
          class: 'delete',
          innerText: 'Delete'
        } 
      },
    ],
    incompleteTasks: [ 
      {}, // LI 
      {}, // LI
    ] 
  }

  /*
  dataModel.completedTasks[0] :
  {
    label: { tagName: 'label', innerText: 'See the Doctor' },
    span: { tagName: 'span', innerText: 'Complete' },
    inputCheckbox: { tagName: 'input', type: 'checkbox', checked: true },
    inputText: { tagName: 'input', type: 'text', disabled: true },
    buttonEdit: { tagName: 'button', class: 'edit', innerText: 'Edit' },
    buttonDelete: { tagName: 'button', class: 'delete', innerText: 'Delete' }
  }

  Object.keys(dataModel.completedTasks[0]) :
  [
    'label',
    'span',
    'inputCheckbox',
    'inputText',
    'buttonEdit',
    'buttonDelete' 
  ]

  for (key in dataModel.completedTasks[0]) { 
    console.log(key+" : "+Object.keys(dataModel.completedTasks[0][key])); 
  } :
    label : tagName,innerText
    span : tagName,innerText
    inputCheckbox : tagName,type,checked
    inputText : tagName,type,disabled
    buttonEdit : tagName,class,innerText
    buttonDelete : tagName,class,innerText
  */

  if (storageAvailable('localStorage')) {
    //Store completed tasks (if there is at least 1+ completed list item...)
    if(completedListItems) {
      for(let i=0; i<completedListItems.length; i++) {
        const listItemChildren = {},
              currentListItem = completedListItems[i];
        for(element in currentListItem.children) {
          listItemChildren[currentListItem.localName] = 'TODO SOMETHING';
          console.log('listItem[element] '+listItem[element]);
        }
        completedTasksArray.push(listItem);
      }
    }
    console.dir(completedTasksArray);
    localStorage.setItem('completedTasks', completedTasksArray);
    //Store incomplete tasks
    if(incompleteListItems) {
      for(let i=0; i<incompleteListItems.length; i++) {
        const listItem = {};
        for(element in incompleteListItems[i].children) {
          console.log('element: '+element+' incompleteListItems[i].children[element]: '+incompleteListItems[i].children[element]);
          listItem[element] = incompleteListItems[i].children[element];
        }
        incompleteTasksArray.push(listItem);
      }
    }
    console.dir(incompleteTasksArray);
    localStorage.setItem('incompleteTasks', incompleteTasksArray);
  
    console.dir(localStorage);
    console.log("Tasks saved to localStorage");
  } else {
    //Warn user localstorage is not available
    alert('Sorry, storage is not available on your device. Try another browser?');
  }
}

retrieveTasks = () => {
  const completedTasksArray = [],
        incompleteTasksArray = [];

  if(storageAvailable('localStorage')) {
    console.log('Retrieveing local storage.');
    if(localStorage.completedTasks) {
      completedTasksArray.push(JSON.parse(localStorage.completedTasks));
      console.dir(completedTasksArray);      
    }
    if(localStorage.incompleteTasks) {
      incompleteTasksArray.push(JSON.parse(localStorage.incompleteTasks));
      console.dir(incompleteTasksArray);      
    }
  } else {
    //Warn user localstorage is not available
    alert('Sorry, storage is not available on your device. Try another browser?');
  }    
}

// Returns true if localStorage is implemented and available in a given browser
storageAvailable = (type) => {
  try {
    const storage = window[type],
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

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

//Save items to localStorage listener
saveButton.addEventListener("click", saveTasks);

//Retrieve items from localStorage listener
retrieveButton.addEventListener("click", retrieveTasks);

//Cycle over incompleteTasksHolder ul list items
for(let i = 0; i < incompleteTasksHolder.children.length; i++) {
  //Bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over completedTasksHolder ul list items
for(let i = 0; i < completedTasksHolder.children.length; i++) {
  //Bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}