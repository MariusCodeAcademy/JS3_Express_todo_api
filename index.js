const express = require('express');

const { findTodoWithId, handleFindErr, handleDelete } = require('./helper/functions');
const todoDb = require('./db/todoDb');
const app = express();

// MiddleWare
// to get request body parsed
app.use(express.json());

// get all todos
app.get('/api/todos', (req, res) => {
  res.json(todoDb);
});
// get one todo
app.get('/api/todos/:id', (req, res) => {
  const found = findTodoWithId(req.params.id);
  // console.log(found);
  if (!found) {
    handleFindErr(req.params.id, res);
    return;
  }
  res.json(found);
});

// delete one todo
app.delete('/api/todos/:id', (req, res) => {
  const paramId = req.params.id;
  const found = findTodoWithId(paramId);

  if (!found) {
    handleFindErr(paramId, res);
    return;
  }

  handleDelete(found);

  console.log(`deleted ${found.title}`);
  res.json({ deleted: found, todoDb });
});

app.post('/api/todos/', (req, res) => {
  console.log(`server got body ${req.body}`);

  const { title } = req.body;

  const newTodo = {
    id: 5, // after the break make todo id to work for you
    title: title,
    done: false,
  };
  todoDb.push(newTodo);

  res.json({ msg: 'success', todoDb });
});

app.listen(3000, () => console.log('server os running'));
