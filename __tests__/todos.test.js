const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/todos.js'); // assuming this is your route file
app.use(express.json());
app.use('/todos', router);

let server; // Declare the server variable

beforeAll(done => {
  server = app.listen(4000, done); // Start the server before running tests
});

afterAll(done => {
  server.close(done); // Close the server after running all tests
});

describe('Todo API', () => {
  // Test get all todos
  it('should get all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  }, 10000); // Increase timeout to 10 seconds

  // Test create a new todo
  it('should create a new todo', async () => {
    const todoText = 'Test Todo';
    const res = await request(app).post('/todos').send({ text: todoText });
    expect(res.statusCode).toEqual(201);
    expect(res.body.text).toEqual(todoText);
  }, 10000); // Increase timeout to 10 seconds

  // Test update a todo
  it('should update a todo', async () => {
    const newTodo = await request(app).post('/todos').send({ text: 'New Todo' });
    const updatedText = 'Updated Todo';
    const res = await request(app).patch(`/todos/${newTodo.body._id}`).send({ text: updatedText });
    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toEqual(updatedText);
  }, 10000); // Increase timeout to 10 seconds

  // Test delete a todo
  it('should delete a todo', async () => {
    const newTodo = await request(app).post('/todos').send({ text: 'Todo to delete' });
    const res = await request(app).delete(`/todos/${newTodo.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Todo deleted');
  }, 10000); // Increase timeout to 10 seconds
});
