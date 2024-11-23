let todoList = [];
displayItems();
function addTodo(){
    let inputElement = document.querySelector('#input-box');
    let inputDate = document.querySelector('#remainder');
    let todoDate = inputDate.value;
    let todoItem = inputElement.value;
    todoList.push({item: todoItem, dueDate: todoDate});
    inputElement.value = '';
    inputDate.value = '';
    displayItems();
}
function displayItems(){
    let containerelements = document.querySelector('.todo-Container');
    let newHTML = '';
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
            }else{
                newHTML +=`
                <span id="items">${item}</span> 
                <span id = "duedate">${dueDate}</span>
                <button class = "btn-delete" onclick = "todoList.splice(${i},1); displayItems();">Delete Task</button>
                `;
            }
            
        }
    }
containerelements.innerHTML = newHTML;
}