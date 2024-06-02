# DevOps Project 1

## Overview

This project is a simple backend application for managing a to-do list. It is built using Node.js, Express, and MongoDB. The application provides APIs to create, read, update, and delete to-do items.

## Features

- Create a new to-do item
- Retrieve all to-do items
- Update an existing to-do item
- Delete a to-do item

## Project Structure

```plaintext
.
├── models
│   └── Todo.js         # Mongoose model for a to-do item
├── routes
│   └── todos.js        # Express routes for to-do CRUD operations
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
├── server.js           # Main server file
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/HannaRamzyHanna/DevOps---Project-1.git
cd DevOps---Project-1
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB URI:

```env
MONGO_URI=your_mongodb_uri_here
PORT=5000
```

### Running the Application

To start the server in production mode:

```sh
npm start
```

To start the server in development mode (with nodemon):

```sh
npm run dev
```

### Testing

To run the tests:

```sh
npm test
```

### Linting

To lint the code:

```sh
npm run lint
```

To automatically fix linting errors:

```sh
npm run lint:fix
```

## API Endpoints

### Get All To-dos

```http
GET /todos
```

Response:

```json
[
  {
    "_id": "60c72b2f9b1e8b2f88a4f3f4",
    "text": "Learn Node.js",
    "completed": false
  },
  ...
]
```

### Create a New To-do

```http
POST /todos
```

Request Body:

```json
{
  "text": "Learn Node.js"
}
```

Response:

```json
{
  "_id": "60c72b2f9b1e8b2f88a4f3f4",
  "text": "Learn Node.js",
  "completed": false
}
```

### Update a To-do

```http
PATCH /todos/:id
```

Request Body:

```json
{
  "text": "Learn Express.js",
  "completed": true
}
```

Response:

```json
{
  "_id": "60c72b2f9b1e8b2f88a4f3f4",
  "text": "Learn Express.js",
  "completed": true
}
```

### Delete a To-do

```http
DELETE /todos/:id
```

Response:

```json
{
  "message": "Todo deleted"
}
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## Issues

If you encounter any issues, please report them at [the project's issues page](https://github.com/HannaRamzyHanna/DevOps---Project-1/issues).

## License

This project is licensed under the ISC License.

## Author

Hanna Ramzy Hanna

## Links

- [Repository](https://github.com/HannaRamzyHanna/DevOps---Project-1)
- [Issues](https://github.com/HannaRamzyHanna/DevOps---Project-1/issues)