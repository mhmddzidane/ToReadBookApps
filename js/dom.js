const UNCOMPLETED_BOOK_LIST_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST_ID = "completeBookshelfList"; 
const TODO_ITEMID = "itemId"
const CHECK_COMPLETE_ID = "inputBookIsComplete"

function cek(){
    const cek = document.getElementById("inputBookIsComplete");
    if(cek.checked){
        checkbox();
    }else{
        addTodo();
    }
}
function makeTodo(data, authorinput, yearinput, isCompleted) {
 
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = data;
 
    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = `Penulis : <span id="author">` + authorinput + `</span>`;

    const bookYear = document.createElement("p");
    bookYear.innerHTML = `Tahun : <span id="year">` + yearinput + `</span>`;
 
    const textContainer = document.createElement("div");
    textContainer.classList.add("book_item")
    textContainer.append(bookTitle, bookAuthor, bookYear);
 
    const container = document.createElement("div");
    container.classList.add("book_shelf")
    container.append(textContainer);

    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
            );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton());
    }

    return container;
}

function addTodo() {
    const UNCOMPLETED_BOOK = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);

    const titleinput = document.getElementById("inputBookTitle").value;
    const authorinput = document.getElementById("inputBookAuthor").value;
    const yearinput = document.getElementById("inputBookYear").value;
    
    const todo = makeTodo(titleinput,authorinput,yearinput,false);
    const todoObject = composeTodoObject(titleinput,authorinput,yearinput,false);

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);
    

    UNCOMPLETED_BOOK.append(todo);
    updateDataToStorage();

}

function checkbox(){
    const cekcomplete = document.getElementById(COMPLETED_BOOK_LIST_ID);
    
    const titlecomplete = document.getElementById("inputBookTitle").value;
    const authorcomplete = document.getElementById("inputBookAuthor").value;
    const yearcomplete = document.getElementById("inputBookYear").value;

    const todocomplete = makeTodo(titlecomplete,authorcomplete,yearcomplete,true);
    const todoObjectcomplete = composeTodoObject(titlecomplete,authorcomplete,yearcomplete,true);

    todocomplete[TODO_ITEMID] = todoObjectcomplete.id;
    todos.push(todoObjectcomplete);

    cekcomplete.append(todocomplete);
    updateDataToStorage();
}

function createButton(buttonTypeClass , buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const completeTitle = taskElement.querySelector("h3").innerText;
    const completeAuthor = taskElement.querySelector("span#author").innerText;
    const completeYear = taskElement.querySelector("span#year").innerText;
 
    const newBook = makeTodo(completeTitle, completeAuthor, completeYear, true);
    const bookCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newBook[TODO_ITEMID] = todo.id;
    
    bookCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}




function createCheckButton() {
    return createButton("myButton","Selesai dibaca", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}

function removeTaskFromCompleted(taskElement) {

    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    var yakin = confirm("Apakah anda yakin menghapus buku?");
    if(yakin){
        taskElement.remove();
    }

    updateDataToStorage();
}

function createTrashButton() {
    return createButton("myButtondel","Hapus", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}




function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    const completeTitle = taskElement.querySelector("h3").innerText;
    const completeAuthor = taskElement.querySelector("span#author").innerText;
    const completeYear = taskElement.querySelector("span#year").innerText;
 
    const newBook = makeTodo(completeTitle, completeAuthor, completeYear, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newBook[TODO_ITEMID] = todo.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}


function createUndoButton() {
    return createButton("myButtonun","Belum dibaca", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}


function filterBook(){
    var input = document.getElementById("searchBookTitle");
    var filter = input.value.toUpperCase();
    var search = document.getElementById("inputBookTitle");
    for (i=0; i < search.length; i++){
        if (search){
            txtvalue = search.textContent || search.innerText;
            if (txtvalue.toUpperCase().indexOf(filter) > -1){
                search[i].style.display = "";
            }else{
                search[i].style.display = "none";
            }
        }
    }

}

