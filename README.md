**<h1>Task Management System API Documentation
Overview</h1>**

The Task Management System API provides endpoints to manage tasks, allowing you to create, retrieve, update, and delete tasks. The API also includes authentication using JSON Web Tokens (JWT) to secure the endpoints.

step - 1
Clone the repository: git clone https://github.com/ChocoUnicorn/TMS.git

Change the directory into your repo folder: cd TMS

step - 2
Install Express: npm install


step - 3
Environment Variables that should be saved in the .env file in the config folder should contain the following:
* PORT: The port number
* DB_STRING: This is the connection string for the MONGO-DB database command pallette
* JWT_SECRET: A secret key used to sign the JWT token.
* JWT_LIFETIME: The duration the token remains alive for.
* COOKIE_SECRET: The secret key for the cookie parser.

step - 4 
Run Server: node index.js

===========================================================================================

<h2>Base URL</h2>

arduino

http://localhost:3000

Authentication
Register a New User
Request

    Method: POST
    URL: /api/v1/auth/signup
    Headers: Content-Type: application/json
    Body:

    json

    {
      "displayName": "diamond",
      "name": "user123",
      "email": "user123@user123.com",
      "password": "password123"
    }

Response

    Status: 201 Created
    Body:

    json

    {
      "message": "User created successfully"
    }

Login
Request

    Method: POST
    URL: /api/v1/auth/login
    Headers: Content-Type: application/json
    Body:

    json

    {
      "email": "user123@user123.com",
      "password": "password123"
    }

Response

    Status: 200 OK
    Body:

    json

    {
      "token": "your-jwt-token",
      message: "User is logged in successfully"
    }

Example CURL Commands
Sign up a New User

sh

curl -X POST http://localhost:3000/api/v1/auth/signup -H "Content-Type: application/json" -d '{"displayName": "diamond","name": "user123","email":"user123@user123.com", "password":"password123"}'

Login

sh

curl -X POST http://localhost:3000/api/v1/auth/login -H "Content-Type: application/json" -d '{"email":"user123@user123.com", "password":"password123"}'

Endpoints
Create a Task
Request

    Method: POST
    URL: /api/v1/tasks
    Headers:
        Content-Type: application/json
        Authorization: Bearer your-jwt-token
    Body:

    json

    {
      "title": "Task Title",
      "description": "Task Description",
    }

Response

    Status: 201 Created
    Body:

    json

    {
      "message": "Task is successfully added to database"
    }

Retrieve All Tasks
Request

    Method: GET
    URL: /api/v1/tasks
    Headers:
        Authorization: Bearer your-jwt-token

Response

    Status: 200 OK
    Body:

    json

    [
      {
              "_id": "task_id",
            "title": "Task Title",
      "description": "Task Description",
      "createdById": req.user.userId,
        "createdBy": req.user.name,
        "createdAt": date task was created,
        "completed": false
      },
      ...
    ]

Retrieve a Single Task
Request

    Method: GET
    URL: /api/v1/tasks/:task_id
    Headers:
        Authorization: Bearer your-jwt-token

Response

    Status: 200 OK
    Body:

    json

    {
             "_id": "task_id",
            "title": "Task Title",
      "description": "Task Description",
      "createdById": req.user.userId,
        "createdBy": req.user.name,
        "createdAt": date task was created,
        "completed": false
    }

Update Task Title and Description (Full Update)
Request

    Method: PATCH
    URL: /api/v1/tasks/:task_id
    Headers:
        Content-Type: application/json
        Authorization: Bearer your-jwt-token
    Body:

    json

    {
      "title": "Updated Title",
      "description": "Updated Description"

    }

Response

    Status: 200 OK
    Body:

    json

    {
      task: { "_id": "task_id",
            "title": "Updated Title",
      "description": "Updated Description",
      "createdById": req.user.userId,
        "createdBy": req.user.name,
        "createdAt": date task was created
        "completed": false},
        message: "Changes effected successfully"
    }

    <!-- Please note that this only works when completed is "false". It will not work if completed is "true" -->

Update completed in task
Request

    Method: PATCH
    URL: /api/v1/tasks/completed/:task_id
    Headers:
        Content-Type: application/json
        Authorization: Bearer your-jwt-token
    Body: Any fields that need to be updated, e.g.:

    json

    {
      "completed": true,
    }

Response

    Status: 200 OK
    Body:

    json

    {
            {
                 "_id": "task_id",
            "title": "Task Title",
      "description": "Task Description",
      "createdById": req.user.userId,
        "createdBy": req.user.name,
        "createdAt": date task was created,
        "completed": true
        }, 
        {
            message: "completed has been changed to true"
        }
    }

Delete a Task
Request

    Method: DELETE
    URL: /api/v1/tasks/:task_id
    Headers:
        Authorization: Bearer your-jwt-token

Response

    Status: 200 OK
    Body:

    json

    {
      "message": "Task is successfully deleted from database"
    }

Error Handling

    400 Bad Request: Invalid input.
    401 Unauthorized: Authentication required or failed.
    404 Not Found: Task not found.
    500 Internal Server Error: Server error.

Example CURL Commands
Create a Task

sh

curl -X POST http://localhost:3000/api/v1/tasks -H "Content-Type: application/json" -H "Authorization: Bearer your-jwt-token" -d '{"title":"Task Title", "description":"Task Description"}'

Retrieve All Tasks

sh

curl -X GET http://localhost:3000/api/v1/tasks -H "Authorization: Bearer your-jwt-token"

Retrieve a Single Task

sh

curl -X GET http://localhost:3000/api/v1/tasks/task_id -H "Authorization: Bearer your-jwt-token"

Update Title and Description in a Task 

sh

curl -X PUT http://localhost:3000/api/v1/tasks/task_id -H "Content-Type: application/json" -H "Authorization: Bearer your-jwt-token" -d '{"title":"Updated Task", "description":"Updated Description"}'

Update Completed in a Task 

sh

curl -X PATCH http://localhost:3000/api/v1/tasks/completed/task_id -H "Content-Type: application/json" -H "Authorization: Bearer your-jwt-token" -d '{"completed":true}'

Delete a Task

sh

curl -X DELETE http://localhost:3000/api/v1/tasks/task_id -H "Authorization: Bearer your-jwt-token"

This documentation provides a comprehensive guide to using the Task Management System API, detailing the available endpoints, request formats, and example responses to help developers integrate and use the system effectively. The inclusion of JWT-based authentication ensures that the API endpoints are secure.
