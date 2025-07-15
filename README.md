Event Management API
This is a REST API built using Node.js, Express, and PostgreSQL for managing events and user registrations. It supports CRUD operations, registration logic, and business rules like preventing duplicate registrations and enforcing event capacity limits.

✅ Features
Create and manage events

Register and cancel event registrations

View event details with registered users

List upcoming events (sorted by date and location)

Get event statistics (capacity and usage)

Input validation and error handling

Handles concurrent registration using database transactions

🛠 Technologies Used
Node.js

Express.js

PostgreSQL (Sequelize ORM)

Joi (for validation)

⚙ Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/SuYaSh-PaThAk04/Event-Management-API.git
cd event-management-api
Install dependencies

bash
Copy
Edit
npm install
Create .env file

ini
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_NAME=event_management
DB_PORT=5432
Create database in PostgreSQL

sql
Copy
Edit
CREATE DATABASE event_management;
Start the server

bash
Copy
Edit
npm run dev
API will run on http://localhost:5000

📌 API Endpoints
Postman Collection: Click here to open

👤 User Routes
Create User

bash
Copy
Edit
POST /api/users
Request

json
Copy
Edit
{
  "name": "Suyash Pathak",
  "email": "suyash@example.com"
}
Response

json
Copy
Edit
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "Suyash Pathak",
    "email": "suyash@example.com"
  }
}
Get All Users

bash
Copy
Edit
GET /api/users
📅 Event Routes
Create Event

bash
Copy
Edit
POST /api/events
Request

json
Copy
Edit
{
  "title": "Tech Event",
  "datetime": "2025-08-15T10:00:00Z",
  "location": "Delhi",
  "capacity": 200
}
Response

json
Copy
Edit
{
  "message": "Event created successfully",
  "eventId": 1
}
Get Event Details

bash
Copy
Edit
GET /api/events/:id
Register for Event

bash
Copy
Edit
POST /api/events/:id/register
Request

json
Copy
Edit
{
  "userId": 1
}
Response

json
Copy
Edit
{
  "message": "User registered successfully"
}
Cancel Registration

bash
Copy
Edit
DELETE /api/events/:id/register
Request

json
Copy
Edit
{
  "userId": 1
}
List Upcoming Events

swift
Copy
Edit
GET /api/events/upcoming/list
Event Stats

bash
Copy
Edit
GET /api/events/:id/stats
Response

json
Copy
Edit
{
  "totalRegistrations": 2,
  "remainingCapacity": 198,
  "percentageUsed": "1%"
}
✅ Business Rules
Capacity cannot exceed 1000

Cannot register for past events

No duplicate registrations

Events sorted by date → location

Transactions ensure concurrency safety

✅ Testing
Use Postman or cURL

For POST/DELETE, select Body → raw → JSON in Postman

👨‍💻 Author
Suyash Pathak
