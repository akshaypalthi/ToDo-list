const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/todoApp').then(()=> console.log("connected to database"));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
