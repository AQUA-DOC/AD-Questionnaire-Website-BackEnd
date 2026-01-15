const todoService = require("../services/todoService");

function getAllTodos(req, res) {
  res.json(todoService.getAll());
}

function getTodoById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const todo = todoService.getById(id);
  if (!todo) return res.status(404).json({ error: "Not found" });

  res.json(todo);
}

function createTodo(req, res) {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required (string)" });
  }

  const created = todoService.create({ title });
  res.status(201).json(created);
}

function updateTodo(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const { title, done } = req.body;

  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({ error: "title must be a string" });
  }
  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "done must be a boolean" });
  }

  const updated = todoService.update(id, { title, done });
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(updated);
}

function deleteTodo(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const deleted = todoService.remove(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });

  res.status(204).send();
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};