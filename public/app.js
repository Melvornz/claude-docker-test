const API = '/api/todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const formError = document.getElementById('form-error');
const listError = document.getElementById('list-error');

async function fetchTodos() {
  showLoading(true);
  hideError(listError);
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error('Chyba při načítání');
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    showError(listError, err.message);
  } finally {
    showLoading(false);
  }
}

function renderTodos(todos) {
  list.innerHTML = '';
  if (todos.length === 0) {
    list.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');
  list.classList.remove('hidden');
  todos.forEach(todo => list.appendChild(createItem(todo)));
}

function createItem(todo) {
  const li = document.createElement('li');
  li.className = 'flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors';
  li.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.className = 'w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0';
  checkbox.addEventListener('change', () => toggleTodo(todo.id));

  const span = document.createElement('span');
  span.textContent = todo.title;
  span.className = `flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`;

  const del = document.createElement('button');
  del.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
  </svg>`;
  del.className = 'text-gray-300 hover:text-red-500 transition-colors flex-shrink-0';
  del.title = 'Smazat';
  del.addEventListener('click', () => deleteTodo(todo.id));

  li.append(checkbox, span, del);
  return li;
}

async function addTodo(title) {
  hideError(formError);
  addBtn.disabled = true;
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Chyba při přidávání');
    input.value = '';
    await fetchTodos();
  } catch (err) {
    showError(formError, err.message);
  } finally {
    addBtn.disabled = false;
  }
}

async function toggleTodo(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Chyba při aktualizaci');
    await fetchTodos();
  } catch (err) {
    showError(listError, err.message);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Chyba při mazání');
    await fetchTodos();
  } catch (err) {
    showError(listError, err.message);
  }
}

function showLoading(show) {
  loading.classList.toggle('hidden', !show);
  if (show) {
    list.classList.add('hidden');
    emptyState.classList.add('hidden');
  }
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideError(el) {
  el.classList.add('hidden');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) {
    showError(formError, 'Zadej název úkolu');
    return;
  }
  addTodo(title);
});

fetchTodos();
