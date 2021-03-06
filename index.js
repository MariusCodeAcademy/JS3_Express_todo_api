const express = require('express');

const { findTodoWithId, handleFindErr, handleDelete, addNewTodo } = require('./helper/functions');
const todoDb = require('./db/todoDb');
const cors = require('cors');
const app = express();

let id = 3; // last item id

// MiddleWare
// to get request body parsed
app.use(express.json());
app.use(cors());

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
  ++id;
  addNewTodo(title, id);

  res.json({ msg: 'success', todoDb });
});

// update todo
//api/todos/:id   // put
app.put('/api/todos/:id', (req, res) => {
  const paramId = req.params.id;
  const found = findTodoWithId(paramId);

  if (!found) {
    handleFindErr(paramId, res);
    return;
  }
  console.log('req.body', req.body);
  // norim atnaujinti found el
  const { title, done } = req.body;
  found.title = title || found.title;
  if (done === true) found.done = true;
  if (done === false) found.done = false;

  console.log(found);
  res.json({ msg: 'update success', found });
});

app.listen(3000, () => console.log('server os running'));

// visi kas pasidare pradeda nauja atskira projekta bet neisjungia esamo

// susikuriam html ir js failus

// html sukuriam mygtukus
// get todos, create Todo, Delete todo 3, update todo 1

// ir pasirasom kad kiekvienas mygtukas atliktu tai ka jis turi atlikti
// kas parasyta jo pavadinime (fetch)

// ND SAVAITGALIUI

/**
 * Pasikurti express serveri nuo nulio
 * pasijungti lintinga
 * pasidaryti Blog postu CRUD'A
 * create read update delete
 *
 * musu darytas projektas https://github.com/MariusCodeAcademy/js3_SImpleTODO
 *
 * parsisiusti pasidaryti nauja git saka, ir joje pabandyti pasijungti musu
 * todo api kuri susikurem snd.
 *
 */
