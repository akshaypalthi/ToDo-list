const Todo = require('../models/todoModel');

exports.createTodo = async (req, res) => {
  const todo = new Todo({
    task: req.body.task,
  });
  await todo.save();
  res.send(todo);
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.task = req.body.task;
  await todo.save();
  res.send(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send({ message: 'Todo deleted' });
};
