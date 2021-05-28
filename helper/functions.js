const todoDb = require('../db/todoDb');

function findTodoWithId(id) {
  console.log('findTodoWithId ran');
  return todoDb.find((t) => t.id === +id);
}

function handleFindErr(paramId, res) {
  console.log('todo not found');
  return res.status(404).json({ error: `todo with id: ${paramId} does not exist` });
}

function handleDelete(found) {
  // todel kad todoDb yra const, mes rasim norimo istrinti index
  // ir pasalinsim is masyvo
  const index = todoDb.indexOf(found);
  todoDb.splice(index, 1);
}

function addNewTodo(title, id) {
  const newTodo = {
    id: id, // after the break make todo id to work for you
    title: title,
    done: false,
  };
  todoDb.push(newTodo);
}

module.exports = {
  findTodoWithId,
  handleFindErr,
  handleDelete,
  addNewTodo,
};
