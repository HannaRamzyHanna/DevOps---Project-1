const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/Todo.js'); // Adjust the path to your Todo model
const todoRouter = require('../routes/todos.js'); // Adjust the path to your routes
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
app.use('/todos', todoRouter);

let server;

beforeAll(async () => {
  const url = process.env.MONGO_URI;
  await mongoose.connect(url);
  server = app.listen(4000);
}, 30000); // Increase timeout to 30 seconds for connection

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
}, 30000); // Increase timeout to 30 seconds for disconnection

describe('Todo API', () => {
  beforeEach(async () => {
    await Todo.deleteMany({});
  });

  it('should get all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new todo', async () => {
    const todoText = 'Test Todo';
    const res = await request(app).post('/todos').send({ text: todoText });
    expect(res.statusCode).toEqual(201);
    expect(res.body.text).toEqual(todoText);
  });

  it('should update a todo', async () => {
    const newTodo = await Todo.create({ text: 'New Todo' });
    const updatedText = 'Updated Todo';
    const res = await request(app).patch(`/todos/${newTodo._id}`).send({ text: updatedText });
    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toEqual(updatedText);
  });

  it('should delete a todo', async () => {
    const newTodo = await Todo.create({ text: 'Todo to delete' });
    const res = await request(app).delete(`/todos/${newTodo._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Todo deleted');
  });
});
