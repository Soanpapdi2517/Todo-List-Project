let todoList = JSON.parse(localStorage.getItem("todoStore")) || []; // Load tasks from localStorage or initialize an empty list
displayItems();
function addTodo() {
  let inputElement = document.querySelector("#input-box");
  let inputDate = document.querySelector("#remainder");
  let todoDate = inputDate.value; // Trim to remove unnecessary spaces
  let todoItem = inputElement.value;

  if (todoItem === "" || todoDate === "") {
    alert("Please enter a valid task and due date.");
    return;
  }

  // Add the new task to the list
  todoList.push({ item: todoItem, dueDate: todoDate });

  inputElement.value = "";
  inputDate.value = "";

  // Save updated list to localStorage
  localStorage.setItem("todoStore", JSON.stringify(todoList));

  // Update the displayed tasks
  displayItems();
}
function displayItems() {
  let containerelements = document.querySelector(".todo-Container");
  let newHTML = "";

  if (todoList.length === 0) {
    newHTML = `<div class = "middle col-span-4 lg:text-xl text-5xl">No Task is Present in the Todo List</div>`;
  } else {
    for (let i = 0; i < todoList.length; i++) {
      let { item, dueDate } = todoList[i];
      if (item === "" || dueDate === "") {
        newHTML = `<span class = "middle col-span-4 lg:text-xl text-5xl">Enter Valid Task with proper Task and date</span>
            `;
        break;
      } else {
        newHTML += `
                
                <span id="items" class="lg:col-auto col-span-2 lg:text-xl text-5xl w-full ">${item}</span>
                <span id = "duedate" class="lg:col-auto col-span-2 lg:text-xl text-5xl">${dueDate}</span>
                <button class = "btn-modify lg:col-auto col-span-2 lg:text-xl text-5xl lg:rounded-xl rounded-3xl lg:h-12 h-24 py-2.5 px-1.5 text-white border-none cursor-pointer transition ease-in-out delay-150 bg-yellow-400 hover:-translate-y-1 hover:scale-110 hover:bg-yellow-600 hover: duration-300 ml-1.5 hover:ring-2 ring-blue-400 ring-inset" onclick = "modifyTask(${i})">Edit</button>
                <button class = "btn-delete lg:col-auto col-span-2 lg:text-xl text-5xl lg:rounded-xl rounded-3xl lg:h-12 h-24 py-2.5 px-1.5 bg-red-600 text-white border-none cursor-pointer transition ease-in-out delay-150 bg-red-600 hover:-translate-y-1 hover:scale-110 hover:bg-red-800 duration-300 ml-1.5 hover:ring-2 ring-blue-400 ring-inset" onclick = "deleteTask(${i});">Delete Task</button>
                `;
      }
    }
  }
  // Update the DOM with the new HTML
  containerelements.innerHTML = newHTML;
}

function deleteTask(index) {
  // Remove the task at the specified index
  todoList.splice(index, 1);

  // Save updated list to localStorage
  localStorage.setItem("todoStore", JSON.stringify(todoList));

  // Update the displayed tasks
  displayItems();
}
function modifyTask(index) {
  // Get the task to be modified
  let { item, dueDate } = todoList[index];

  // Render input fields with existing values
  let containerElements = document.querySelector(".todo-Container");
  containerElements.innerHTML = `
            <input type="text" id="modify-item" class="lg:pl-2 pl-4 lg:text-lg text-5xl lg:rounded-lg rounded-3xl border-none hover:ring-2 hover:ring-blue-500 lg:col-auto col-span-2 lg:h-12 h-24 focus:ring-2 ring-pink-500 ring-inset lg:w-full lg:mx-auto mx-4" value="${item}" placeholder="Task description" />
            <input type="date" id="modify-date" class="lg:pl-2 pl-4 lg:text-lg text-5xl lg:rounded-lg rounded-3xl border-none hover:ring-2 hover:ring-blue-500 lg:col-auto col-span-2 lg:h-12 h-24 focus:ring-2 ring-pink-500 ring-inset lg:w-full lg:mx-auto mx-4" value="${dueDate}" />
            <button class="lg:col-auto col-span-2 lg:text-xl text-5xl lg:rounded-xl rounded-3xl lg:h-12 h-24 py-2.5 px-1.5 text-white border-none cursor-pointer transition ease-in-out delay-150 bg-green-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-800 duration-300 ml-1.5 hover:ring-2 ring-blue-400 ring-inset lg:w-full lg:mx-auto mx-4" onclick="saveModification(${index})">Save</button>
            <button class="lg:col-auto col-span-2 lg:text-xl text-5xl lg:rounded-xl rounded-3xl lg:h-12 h-24 py-2.5 px-1.5 bg-red-600 text-white border-none cursor-pointer transition ease-in-out delay-150 bg-red-600 hover:-translate-y-1 hover:scale-110 hover:bg-red-800 duration-300 ml-1.5 hover:ring-2 ring-blue-400 ring-inset lg:w-full lg:mx-auto mr-4" onclick="cancelModification()">Cancel</button>
    `;
}
function saveModification(index) {
  // Get updated values
  let modifiedItem = document.querySelector("#modify-item").value.trim();
  let modifiedDate = document.querySelector("#modify-date").value.trim();

  if (modifiedItem === "" || modifiedDate === "") {
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
