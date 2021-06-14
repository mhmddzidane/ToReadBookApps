const STORAGE_KEY = "BOOK_APPS";
 
let todos = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(todos);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       todos = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeTodoObject(titleinput, authorinput, yearinput, isCompleted) {
   return {
       id: +new Date(),
       titleinput,
       authorinput,
       yearinput,
       isCompleted
   };
}
 
function findTodo(todoId) {
   for(todo of todos){
       if(todo.id === todoId)
           return todo;
   }
   return null;
}
 
 
function findTodoIndex(todoId) {
   let index = 0
   for (todo of todos) {
       if(todo.id === todoId)
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
  
  
    for(todo of todos){
        const newTodo = makeTodo(todo.titleinput, todo.authorinput ,todo.yearinput, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;
  
  
        if(todo.isCompleted){
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
 }