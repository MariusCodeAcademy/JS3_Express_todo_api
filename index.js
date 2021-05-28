const express = require('express');

const { findTodoWithId, handleFindErr } = require('./helper/functions');
const todoDb = require('./db/todoDb');
const app = express();

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

  console.log(`trinsim ${found}`);
  res.json({ youWantToDelete: found });
});

app.listen(3000, () => console.log('server os running'));
