class Todo {
  constructor(text) {
    this.text = text;
    this.status = "todo";
    this.created = new Date();
    this.completed = null;
  }

  complete() {
    this.status = "done";
    this.completed = new Date();
  }

  uncomplete() {
    this.status = "todo";
    this.completed = null;
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

    this.todoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.addTodo();
      }
    });
  }

  addTodo() {
    const text = this.todoInput.value.trim();

    if (!text) {
      alert("Please enter a task.");
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
    const newText = prompt("Edit task:", this.todos[index].text);

    if (newText === null) return;

    if (newText.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }

    this.todos[index].edit(newText.trim());

    this.renderTodos();
  }

  deleteTodo(index) {
    if (this.todos[index].status !== "done") {
      alert("Only completed tasks can be deleted.");
      return;
    }

    this.todos.splice(index, 1);

    this.renderTodos();
  }

  createTodoElement(todo, index) {
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-start";

    // ---------- LEFT ----------

    const left = document.createElement("div");

    left.className = "d-flex gap-3";

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.className = "form-check-input mt-1";
    checkbox.checked = todo.status === "done";

    checkbox.addEventListener("change", () => {
      this.toggleTodo(index);
    });

    const info = document.createElement("div");

    const text = document.createElement("div");

    text.textContent = todo.text;
    text.className = "fw-semibold";

    if (todo.status === "done") {
      text.classList.add(
        "text-decoration-line-through",
        "text-muted"
      );
    }

    const created = document.createElement("small");

    created.className = "d-block text-secondary";

    created.textContent =
      "Created: " +
      todo.created.toLocaleString();

    info.append(text, created);

    if (todo.completed) {
      const completed = document.createElement("small");

      completed.className = "d-block text-success";

      completed.textContent =
        "Completed: " +
        todo.completed.toLocaleString();

      info.append(completed);
    }

    left.append(checkbox, info);

    // ---------- RIGHT ----------

    const right = document.createElement("div");

    const editBtn = document.createElement("button");

    editBtn.className =
      "btn btn-warning btn-sm me-2";

    editBtn.textContent = "✏️";

    editBtn.addEventListener("click", () => {
      this.editTodo(index);
    });

    const deleteBtn = document.createElement("button");

    deleteBtn.className =
      "btn btn-danger btn-sm";

    deleteBtn.textContent = "🗑️";

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
      this.todoList.append(
        this.createTodoElement(todo, index)
      );
    });
  }
}

new TodoApp();