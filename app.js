var name = prompt("What is your name?");
var final= name+ "'s ToDo list";
document.getElementById("main-head").innerHTML=final;

// selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOptions=document.querySelector('.filter-todo');



//====================================================================

//event listeners

// to clear the local storage
document.addEventListener('DOMContentLoaded',getTodos);

todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',doneDelete); // here we will take care of "mark-done" and "delete" functionalities.

/* on cliking the todo-button we will execute the funtion 'addTodo'*/

filterOptions.addEventListener('click',filterTodo);



//=========================================================================
//function
function addTodo(event)
{
    event.preventDefault(); // to preven the button from submitting(refreshing everytime we click it).
    /*
        We want to create following html structure on clicking.
        <ul class="todo-list">
        <div class="todo">
              <li class="todo-item"></li>
              <button class="delete"></button>
              <button class="mark-done"></button>
               
            </div>
        </ul>
        <ul> already exists
     */
    
    // todo div
    const todoDiv=document.createElement("div"); //*//
    todoDiv.classList.add("todo"); //*//

    //li

    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');

    // adding li  to todo div

    todoDiv.appendChild(newTodo);


    //adding(saving) the new todo to local storage
    saveToLocal(todoInput.value);

    // buttons
    //mark-done button

    const completedButton=document.createElement('button');
    completedButton.classList.add('mark-done');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //delete button

    const deleteButton=document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML='<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    // append to list
    todoList.appendChild(todoDiv);
    //we had selected "todo-list" in the selector section

    // to clear the input after making one task

    todoInput.value="";

}


// function to 'mark-done' and 'delete'

function doneDelete(e)
{
    const pressed=e.target;
    
    // delete

    if(pressed.classList[0] === 'delete')
    {
        const parentEle=pressed.parentElement;

        //animation
        parentEle.classList.add("fall");

        //to delete the item from local storage
        removeLocalTodos(parentEle);

        // after transition end(animation) , remove it
        parentEle.addEventListener("transitionend",function(){
            parentEle.remove();
        })


        
    }

    //mark done;

    if(pressed.classList[0] ==='mark-done')
    {
        const parentEle=pressed.parentElement;
        parentEle.classList.toggle('complete');
    }
}


function filterTodo(e)
{
    const todos=todoList.childNodes;
    todos.forEach(function(task) {
        switch(e.target.value){
            case 'all':
                task.style.display="flex";
                break;
            
            case 'completed':
                if(task.classList.contains('complete')){
                    task.style.display="flex";
                }else {
                    task.style.display="none";
                }
                break;

            case 'pending':
                if(task.classList.contains('complete')){
                    task.style.display="none";
                }else {
                    task.style.display="flex";
                }
                break;
            
            
        }

    })
}


// Everything done .

// Now if we want to , we can save the todos to our local storage

function saveToLocal(task)
{
    let todos;
    
    //everytime we call this function , an element(which we will later declare as array) is created.
    // if we already have saved before , there exists a "todos" already .
    //on refresing the page , the "todos" does not dissapear. It still stays in the local storage.
    // if such a list already exists , we do not want to overwrite it , simply add to it.

    // Cecking if list of todos named "todos" already exists.

    if(localStorage.getItem("todos") === null){
        //if "todos" does not exist
        todos = []; //declare it as an empty array.

    }else{
        // if it exists
        // parse the already existing array using JSON
        todos = JSON.parse(localStorage.getItem("todos"));

    }

    todos.push(task); // push the new task into the "todos" array(either empty , or already existing one)

    // reverse parse the array and store to local storage

    localStorage.setItem("todos", JSON.stringify(todos));

}


// To delete stuff from the local storage

function getTodos(){
    // first check for the existence of "todos"
    if(localStorage.getItem("todos") === null){
        //if "todos" does not exist
        todos = []; //declare it as an empty array.

    }else{
        // if it exists
        // parse the already existing array using JSON
        todos = JSON.parse(localStorage.getItem("todos"));

    }

    todos.forEach(function(task){
        const todoDiv=document.createElement("div"); //*//
    todoDiv.classList.add("todo"); //*//

    //li

    const newTodo=document.createElement('li');
    newTodo.innerText=task;
    newTodo.classList.add('todo-item');

    // adding li  to todo div

    todoDiv.appendChild(newTodo);


    // buttons
    //mark-done button

    const completedButton=document.createElement('button');
    completedButton.classList.add('mark-done');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //delete button

    const deleteButton=document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML='<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    // append to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(task){
    let todos;
    if(localStorage.getItem("todos") === null){
        //if "todos" does not exist
        todos = []; //declare it as an empty array.

    }else{
        // if it exists
        // parse the already existing array using JSON
        todos = JSON.parse(localStorage.getItem("todos"));

    }

    // task -> access to the "todo fall" class.

    const removedEle=task.children[0].innerText;
    // It will return the element that we deleted. 

    const removeIndex=todos.indexOf(removedEle);
    // It will return the index of the element that we deleted. 

    // since we have the index of the element that was removed , we can also remove it from the local storage.
    
    todos.splice(removeIndex,1);// ( "from which index" , " how many"); we want to remove only one.

    // set back the updated array to local storage.

    localStorage.setItem("todos",JSON.stringify(todos));


}