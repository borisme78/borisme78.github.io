class Todo {
  constructor(text) {
    this.text = text;
    this.status = "todo";
    this.startDate = new Date();
    this.endDate = null;
  }

  complete() {
    this.status = "done";
    this.endDate = new Date();
  }

  uncomplete() {
    this.status = "todo";
    this.endDate = null;
  }

  edit(newText) {
    this.text = newText;
  }
}

class TodoApp {
  constructor() {
    this.todoInput = document.getElementById("todoInput");
    this.todoList = document.getElementById("todoList");
    this.addButton = document.getElementById("addButton");

    this.todos = [];

    this.addButton.addEventListener("click", () => this.addTodo());
  }

  addTodo() {
    const text = this.todoInput.value.trim();

    if (!text) {
      alert("Please enter a todo.");
      return;
    }

    const todo = new Todo(text);

    this.todos.push(todo);

    this.todoInput.value = "";

    this.renderTodos();
  }

  toggleTodo(index) {
    const todo = this.todos[index];

    if (todo.status === "done") {
      todo.uncomplete();
    } else {
      todo.complete();
    }

    this.renderTodos();
  }

  editTodo(index) {
    const newText = prompt("Edit todo:", this.todos[index].text);

    if (newText === null) return;

    if (newText.trim() === "") {
      alert("Todo cannot be empty.");
      return;
    }

    this.todos[index].edit(newText.trim());

    this.renderTodos();
  }

  deleteTodo(index) {
    if (this.todos[index].status !== "done") {
      alert("You can delete only completed tasks.");
      return;
    }

    this.todos.splice(index, 1);

    this.renderTodos();
  }

  createTodoElement(todo, index) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    // Ліва частина
    const left = document.createElement("div");
    left.className = "d-flex align-items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.status === "done";

    checkbox.addEventListener("change", () => {
      this.toggleTodo(index);
    });

    const text = document.createElement("span");
    text.textContent = todo.text;

    if (todo.status === "done") {
      text.classList.add("text-decoration-line-through", "text-muted");
    }

    left.append(checkbox, text);

    // Права частина
    const right = document.createElement("div");

    // Кнопка редагування
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning btn-sm me-2";
    editBtn.textContent = "✏️";

    editBtn.addEventListener("click", () => {
      this.editTodo(index);
    });

    // Кнопка видалення
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.textContent = "🗑️";

    // Не можна видалити, поки завдання не виконане
    deleteBtn.disabled = todo.status !== "done";

    deleteBtn.addEventListener("click", () => {
      this.deleteTodo(index);
    });

    right.append(editBtn, deleteBtn);

    li.append(left, right);

    return li;
  }

  renderTodos() {
    this.todoList.innerHTML = "";

    this.todos.forEach((todo, index) => {
      const li = this.createTodoElement(todo, index);
      this.todoList.append(li);
    });
  }
}


new TodoApp();