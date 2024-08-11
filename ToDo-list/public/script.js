document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todoForm');
  const taskInput = document.getElementById('task');
  const todoList = document.getElementById('todoList');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const task = taskInput.value;
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });
    const todo = await response.json();
    addTodoToDOM(todo);
    taskInput.value = '';
  });

  async function fetchTodos() {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    todos.forEach(addTodoToDOM);
  }

  function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo._id;
    li.innerHTML = `
        <span>${todo.task}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;
    todoList.appendChild(li);

    li.querySelector('.delete').addEventListener('click', () => {
      deleteTodo(todo._id, li);
    });

    li.querySelector('.edit').addEventListener('click', () => {
      editTodo(todo, li);
    });
  }

  async function deleteTodo(id, li) {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    li.remove();
  }

  function editTodo(todo, li) {
    const span = li.querySelector('span');
    const newTask = prompt('Edit your task', todo.task);
    if (newTask) {
      updateTodo(todo._id, newTask, span);
    }
  }

  async function updateTodo(id, newTask, span) {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTask }),
    });
    const updatedTodo = await response.json();
    span.textContent = updatedTodo.task;
  }

  fetchTodos();
});
