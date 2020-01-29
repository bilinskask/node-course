const Todo = require("./todoModel");

const createItem = async (req, res) => {
  let data = req.body;
  let todo = new Todo();
  todo.title = data.title;
  todo.description = data.description;
  todo.user = req.user._id;
  todo.completed = data.completed;

  try {
    let savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (e) {
    res.status(400).json(e);
  }
};

const getAll = async (req, res) => {
  let items = await Todo.find({
    user: req.user._id
  });
  res.json(items);
};

const deleteItem = async (req, res) => {
  let id = req.params.id;
  let response = await Todo.findByIdAndDelete(id);
  res.json(response)
};

const updateItem = async (req, res) =>{
  let id = req.params.id;
  try {
    let item = await Todo.findByIdAndUpdate({
      _id: id
    });
    item.completed = req.body.completed
    item.save()
    res.json(item)
  } catch (e) {
    res.status(400).json(e);
  }
  }

module.exports = {
  createItem,
  getAll,
  deleteItem,
  updateItem
};
