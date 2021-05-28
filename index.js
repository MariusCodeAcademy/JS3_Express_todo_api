const express = require('express');

const app = express();

const todoDb = [
  {
    id: 1,
    title: 'Go do stuff',
    done: false,
  },
  {
    id: 2,
    title: 'Walk a dog',
    done: true,
  },
  {
    id: 3,
    title: 'Buy milk',
    done: false,
  },
];

app.get('/api/todos', (req, res) => {
  res.json(todoDb);
});

app.listen(3000, () => console.log('server os running'));
