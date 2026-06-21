// Select DOM elements
const input = document.getElementById("todo-input");
const addbtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Load saved todos from localStorage
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a todo item
function createTodoNode(todo, index) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center justify-content-between";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    // Text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 10px";
    textSpan.style.flex = "1";

    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        textSpan.style.textDecoration =
            todo.completed ? "line-through" : "none";

        saveTodos();
    });

    // Edit on double click
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo", todo.text);

        if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn btn-danger btn-sm";

    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render todos
function render() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// Add todo
function addTodo() {
    const text = input.value.trim();

    if (!text) {
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = "";
    render();
    saveTodos();
}

// Add button click
addbtn.addEventListener("click", addTodo);

// Enter key support
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
const darkBtn = document.getElementById("dark-mode-btn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


//filter functionality
const filter = document.getElementById("filter");

filter.addEventListener("change", render);

function render() {

    list.innerHTML = "";

    const filterValue = filter.value;

    todos.forEach((todo, index) => {

        const showTodo =
            filterValue === "all" ||
            (filterValue === "completed" && todo.completed) ||
            (filterValue === "pending" && !todo.completed);

        if (showTodo) {
            list.appendChild(
                createTodoNode(todo, index)
            );
        }
    });
}

// Initial render
render();

//seach functionality
