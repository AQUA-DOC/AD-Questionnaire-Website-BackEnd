let todos = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Use Controllers/Routes/Services", done: false }
];

function getAll() {
  return todos;
}

function getById(id) {
  return todos.find(t => t.id === id) || null;
}

function create({ title }) {
  const newTodo = { id: Date.now(), title, done: false };
  todos.push(newTodo);
  return newTodo;
}

function update(id, { title, done }) {
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return null;

  todos[idx] = {
    ...todos[idx],
    ...(title !== undefined ? { title } : {}),
    ...(done !== undefined ? { done } : {})
  };

  return todos[idx];
}

function remove(id) {
  const before = todos.length;
  todos = todos.filter(t => t.id !== id);
  return todos.length !== before; // true if something was deleted
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};