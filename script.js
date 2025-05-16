const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-name-input');
const taskDesc = document.getElementById('task-description');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const completedCount = document.getElementById('completed-tasks');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value, taskDesc.value);
  taskInput.value = '';
  taskDesc.value = '';
});

function addTask(name, desc) {
  const task = {
    id: Date.now(),
    name,
    desc,
    completed: false
  };
  tasks.push(task);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <div class="left">
        <i class="fa-solid fa-check ${task.completed ? 'active' : ''}" onclick="toggleComplete(${task.id})"></i>

        <div>
          <strong>${task.name}</strong><br>
          <small>${task.desc}</small>
        </div>
      </div>
      <div class="right">
        <i class="fa-solid fa-pencil" onclick="editTask(${task.id})"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask(${task.id})"></i>
      </div>
    `;
    taskList.appendChild(li);
  });

  updateCounts();
}

function toggleComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newName = prompt('Edit Task Name', task.name);
    const newDesc = prompt('Edit Task Description', task.desc);
    if (newName !== null) task.name = newName;
    if (newDesc !== null) task.desc = newDesc;
    renderTasks();
  }
}

function updateCounts() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  taskCount.textContent = `Total Tasks: ${total}`;
  completedCount.textContent = `Completed Tasks: ${completed}`;
}

document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('fa-check')) {
    e.target.classList.toggle('active');
  }
});


