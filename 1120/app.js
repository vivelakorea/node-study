const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const connect = () => {
  mongoose.connect(
      `mongodb+srv://ghostman:${process.env.MONGO_PASSWORD}@cluster0.xa9an.mongodb.net/Cluster0?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
  );
};

connect();
// monogo로 하기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const tasks = JSON.parse(
//     fs.readFileSync('./tasks.json', { encoding: 'utf-8' }),
// );

const Task = require('./schemas/task');

// read

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.send(task);
});


// create

app.post('/tasks', async (req, res) => {
  const { date, todo } = req.body;
  const task = new Task({ date, todo });
  await task.save();
  res.redirect('/tasks');
});

// delete

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  await task.delete();
  res.redirect('/tasks');
});

// update

app.put('/tasks/:id', async (req, res) => {
  const { date, todo } = req.body;
  const { id } = req.params;
  await Task.replaceOne({ _id: id }, { date, todo });
  res.redirect('/tasks');
});


// mongoose event listener
mongoose.connection.on('error', (error) => {
  console.error(`몽고디비 연결 에러: ${error}`);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다');
  connect();
});


// 들어

app.get('/', (req, res) => {res.send('hell00000o');});

app.listen(4000, () => {console.log('listening on port: 4000');});

