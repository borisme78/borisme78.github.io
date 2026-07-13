const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const addButton = document.getElementById("addButton");

const todos = [];

function createTodoElement(todoItem) {
  const li = document.createElement("li");

  li.classList.add("list-group-item");

  li.textContent = todoItem.text;

  return li;
}

function completeTodo(todoItem, li) {
    if (todoItem.status === "done") {
    return;
}
  todoItem.status = "done";
  todoItem.endDate = new Date();
  li.classList.add("text-decoration-line-through");
  li.classList.add("text-muted");
  console.log(todoItem);
}

function renderTodos() {
    
}

function addTodo() {
  if (todoInput.value.trim() === "") {
    alert("Please enter a todo item.");
    return;
  }

  const todoItem = {
    text: todoInput.value,
    status: "todo",
    startDate: new Date(),
    endDate: null,
  };

  todos.push(todoItem);

  const li = createTodoElement(todoItem);

  li.addEventListener("click", function () {
    completeTodo(todoItem, li);
  });

 

  todoList.append(li);

  todoInput.value = "";
}

addButton.addEventListener("click", addTodo);
