// 





//Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const searchInput = document.querySelector("#search-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções
const saveTodo = text => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);
};

const loadTodos = () => {
  const todos = localStorage.getItem("todos");
  if (todos) {
    const todosArr = JSON.parse(todos);
    todosArr.forEach(todoText => {
      saveTodo(todoText);
    });
  }
};

const saveTodos = () => {
  const todosArr = [];
  const todoTitles = todoList.querySelectorAll("h3");
  todoTitles.forEach(todoTitle => {
    todosArr.push(todoTitle.innerText);
  });
  localStorage.setItem("todos", JSON.stringify(todosArr));
};

const toggleForm = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = text => {
  const todos = document.querySelectorAll(".todo");
todos.forEach(todo => {
if (todo.querySelector("h3").innerText === oldInputValue) {
todo.querySelector("h3").innerText = text;
toggleForm();
}
});
};

const finishTodo = todo => {
todo.classList.toggle("done");
};

const removeTodo = todo => {
todo.remove();
};

//Event Listeners
todoForm.addEventListener("submit", e => {
e.preventDefault();
const todoText = todoInput.value;
if (todoText) {
saveTodo(todoText);
saveTodos();
todoInput.value = "";
}
});

todoList.addEventListener("click", e => {
if (e.target.classList.contains("finish-todo")) {
const todo = e.target.parentElement;
finishTodo(todo);
saveTodos();
}
 else if (e.target.classList.contains("remove-todo")) {
const todo = e.target.parentElement;
removeTodo(todo);
saveTodos();
} 
else if (e.target.classList.contains("edit-todo")) {
toggleForm();
const todo = e.target.parentElement;
oldInputValue = todo.querySelector("h3").innerText;
editInput.value = oldInputValue;
}
});

editForm.addEventListener("submit", e => {
e.preventDefault();
const newValue = editInput.value;
if (newValue) {
updateTodo(newValue);
saveTodos();
}
});
cancelEditBtn.addEventListener("click", e => {
    e.preventDefault();
    toggleForm();
    editInput.value = "";
  });

//Load saved todos
loadTodos();
  

//Adicionei os eventos para o botão cancelar edição e para o botão de atualizar tarefa. Também adicionei o salvamento dos todos quando há alguma alteração na lista de tarefas.