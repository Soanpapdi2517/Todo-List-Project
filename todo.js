let todoList =JSON.parse(localStorage.getItem("todoStore")) || [] ; // Load tasks from localStorage or initialize an empty list
displayItems();
function addTodo(){
    let inputElement = document.querySelector('#input-box');
    let inputDate = document.querySelector('#remainder');
    let todoDate = inputDate.value; // Trim to remove unnecessary spaces
    let todoItem = inputElement.value;

    if (todoItem === '' || todoDate === '') {
        alert("Please enter a valid task and due date.");
        return;
    }

      // Add the new task to the list
    todoList.push({item: todoItem, dueDate: todoDate});

    inputElement.value = '';
    inputDate.value = '';

    // Save updated list to localStorage
    localStorage.setItem("todoStore",JSON.stringify(todoList));
    
    // Update the displayed tasks
    displayItems();
}
function displayItems(){
    let containerelements = document.querySelector('.todo-Container');
    let newHTML ='';
    
    if(todoList.length===0){
        newHTML = `<div class = "middle">No Task is Present in the Todo List</div>`;
    }
    else{
        for(let i = 0; i < todoList.length; i++){
            let {item, dueDate} = todoList[i];
            if(item === '' || dueDate ===''){
                newHTML = `<span class = "middle">Enter Valid Task with proper Task and date</span>
                <button class = "btn-delete" onclick = "todoList.splice(${i},1); displayItems();">Delete Task</button>
            `;
            break;
            }else{
                newHTML +=`
                <span id="items">${item}</span> 
                <span id = "duedate">${dueDate}</span>
                <button class = "btn-modify" onclick = "modifyTask(${i})">Edit</button>
                <button class = "btn-delete" onclick = "deleteTask(${i});">Delete Task</button>
                `;
            }
            
        }
    }
// Update the DOM with the new HTML
containerelements.innerHTML = newHTML;
}

function deleteTask(index){
    // Remove the task at the specified index
    todoList.splice(index, 1);

     // Save updated list to localStorage
     localStorage.setItem("todoStore", JSON.stringify(todoList));

     // Update the displayed tasks
    displayItems();
}
function modifyTask(index){
    // Get the task to be modified
    let { item, dueDate } = todoList[index];

    // Render input fields with existing values
    let containerElements = document.querySelector('.todo-Container');
    containerElements.innerHTML = `
        <div class="modify-section">
            <input type="text" id="modify-item" value="${item}" placeholder="Task description" />
            <input type="date" id="modify-date" value="${dueDate}" />
            <button onclick="saveModification(${index})">Save</button>
            <button onclick="cancelModification()">Cancel</button>
        </div>
    `;
}
function saveModification(index) {
    // Get updated values
    let modifiedItem = document.querySelector('#modify-item').value.trim();
    let modifiedDate = document.querySelector('#modify-date').value.trim();

    if (modifiedItem === '' || modifiedDate === '') {
        alert("Please enter a valid task and due date.");
        return;
    }

    // Update the task in the list
    todoList[index] = { item: modifiedItem, dueDate: modifiedDate };

    // Save updated list to localStorage
    localStorage.setItem("todoStore", JSON.stringify(todoList));

    // Redisplay the updated tasks
    displayItems();
}

function cancelModification() {
    // Simply redisplay the existing tasks
    displayItems();
}