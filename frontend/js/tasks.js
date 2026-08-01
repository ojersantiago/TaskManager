const API_URL = 'https://task-manager-backend-mcoz.onrender.com/api';

const token = localStorage.getItem('token');

async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

async function createTask(task) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  return await response.json();
}

async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  return await response.json();
}

async function deleteTask(id) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function isOverdue(dateString) {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dateString);
  return dueDate < today;
}

function renderTasks(tasks) {
  const tasksList = document.getElementById('tasks-list');

  if (tasks.length === 0) {
    tasksList.innerHTML = '<div class="empty-state">No hay tareas para mostrar</div>';
    return;
  }

  tasksList.innerHTML = tasks.map(task => `
    <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <div class="task-card-header">
        <span class="task-title">${task.title}</span>
        <div class="task-actions">
          ${!task.completed ? `
            <button class="btn-complete" onclick="handleComplete(${task.id}, ${JSON.stringify(task).replace(/"/g, '&quot;')})">
              ✓ Completar
            </button>
          ` : ''}
          <button class="btn-edit" onclick="handleEdit(${JSON.stringify(task).replace(/"/g, '&quot;')})">
            ✎ Editar
          </button>
          <button class="btn-delete" onclick="handleDelete(${task.id})">
            ✕ Eliminar
          </button>
        </div>
      </div>
      ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
      ${task.due_date ? `
        <span class="task-due-date ${isOverdue(task.due_date) && !task.completed ? 'overdue' : ''}">
          📅 ${formatDate(task.due_date)}
          ${isOverdue(task.due_date) && !task.completed ? '— Vencida' : ''}
        </span>
      ` : ''}
    </div>
  `).join('');
}