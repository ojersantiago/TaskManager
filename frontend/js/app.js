// Verificar autenticación
if (!localStorage.getItem('token')) {
  window.location.href = 'login.html';
}

// Variables globales
let allTasks = [];
let editingTaskId = null;
let currentFilter = 'all';

// Elementos del DOM
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const logoutBtn = document.getElementById('logout-btn');

// ===== CARGAR TAREAS =====
async function loadTasks() {
  allTasks = await getTasks();
  applyFilter(currentFilter);
}

// ===== FILTROS =====
function applyFilter(filter) {
  currentFilter = filter;
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  let filtered = allTasks;
  if (filter === 'pending') filtered = allTasks.filter(t => !t.completed);
  if (filter === 'completed') filtered = allTasks.filter(t => t.completed);

  renderTasks(filtered);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

// ===== GUARDAR TAREA =====
saveBtn.addEventListener('click', async () => {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const due_date = dueDateInput.value;

  if (!title) {
    alert('El título es obligatorio');
    return;
  }

  if (editingTaskId) {
    // Editar tarea existente
    const task = allTasks.find(t => t.id === editingTaskId);
    await updateTask(editingTaskId, {
      title,
      description,
      due_date,
      completed: task.completed
    });
    cancelEdit();
  } else {
    // Crear tarea nueva
    await createTask({ title, description, due_date });
  }

  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';

  await loadTasks();
});

// ===== COMPLETAR TAREA =====
async function handleComplete(id, task) {
  await updateTask(id, {
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    completed: true
  });
  await loadTasks();
}

// ===== EDITAR TAREA =====
function handleEdit(task) {
  editingTaskId = task.id;
  titleInput.value = task.title;
  descriptionInput.value = task.description || '';
  dueDateInput.value = task.due_date ? task.due_date.split('T')[0] : '';
  formTitle.textContent = 'Editar tarea';
  saveBtn.textContent = 'Guardar cambios';
  cancelBtn.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editingTaskId = null;
  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
  formTitle.textContent = 'Nueva tarea';
  saveBtn.textContent = 'Guardar tarea';
  cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', cancelEdit);

// ===== ELIMINAR TAREA =====
async function handleDelete(id) {
  if (!confirm('¿Estás seguro de que querés eliminar esta tarea?')) return;
  await deleteTask(id);
  await loadTasks();
}

// ===== LOGOUT =====
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// ===== INICIAR =====
loadTasks();