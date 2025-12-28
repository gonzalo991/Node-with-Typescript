# Task API – Clean Architecture Example

This project is a **Task Management REST API** built with **Node.js, Express, TypeScript, and MongoDB (Mongoose)** following **Clean Architecture principles**.

The goal of this project is not just CRUD functionality, but to demonstrate **good backend architecture**, clear separation of concerns, domain-driven thinking, and professional error handling.

---

## 🎯 Purpose of the Project

* Practice **Clean Architecture** in a real backend application
* Separate **domain logic** from **infrastructure details**
* Use **DTOs**, **repositories**, **services**, and **controllers** correctly
* Implement **custom exceptions** and **global error handling**
* Build a codebase that is easy to test, scale, and maintain

This project is designed as a **learning + portfolio** backend.

---

## 🧱 Architecture Overview

The project follows a layered architecture:

```
src/
├── modules/
│   └── task/
│       ├── domain/
│       │   └── task.ts
│       ├── dto/
│       │   ├── create-task.dto.ts
│       │   └── update-task.dto.ts
│       ├── task.repository.ts
│       ├── task.repository.impl.ts
│       ├── task.service.ts
│       ├── task.controller.ts
│       └── task.routes.ts
│
├── error/
│   └── app.exception.ts
│
├── middlewares/
│   └── handleError.ts
│
├── app.ts
└── server.ts
```

---

## 🧠 Layer Responsibilities

### 1. Domain Layer

**What it contains:**

* Core business entities (pure TypeScript interfaces)

**Rules:**

* No framework imports
* No database knowledge
* No HTTP knowledge

Example:

* `Task` represents what a task *is*, not how it is stored or transferred.

---

### 2. DTO Layer (Data Transfer Objects)

**Purpose:**

* Define the shape of incoming data

**Key ideas:**

* `createTaskDto`: all required fields
* `updateTaskDto`: optional fields (partial updates)

DTOs protect the domain from invalid or unexpected input.

---

### 3. Repository Layer

**Interface (`TaskRepository`)**

* Defines what operations are available
* Uses **domain types**, never Mongoose models

**Implementation (`TaskRepositoryImpl`)**

* Contains MongoDB / Mongoose logic
* Maps database documents to domain objects

This allows swapping MongoDB for another database without changing business logic.

---

### 4. Service Layer (Business Logic)

**Responsibilities:**

* Validate input
* Apply business rules
* Decide when to throw exceptions
* Orchestrate repository calls

**Important:**

* Services do NOT know about HTTP or Express
* Services throw **custom exceptions**, not HTTP responses

This is the heart of the application.

---

### 5. Controller Layer

**Responsibilities:**

* Handle HTTP requests
* Extract params and body
* Call services
* Return HTTP responses
* Forward errors using `next(error)`

Controllers are thin by design.

---

## ⚠️ Error Handling Strategy

### Custom Exceptions

All application errors extend a base `AppException`:

* `ValidationException`
* `NotFoundException`
* `CreationException`
* `UpdateException`
* `DeletionException`

These exceptions:

* Represent **business errors**, not HTTP errors
* Are thrown inside services

---

### Global Error Handler

A centralized middleware:

* Converts exceptions into HTTP responses
* Maps exception type → HTTP status
* Prevents duplicated error handling logic

Benefits:

* Clean controllers
* Consistent API responses
* Easy to extend

---

## 🔁 Request Flow

1. Client sends HTTP request
2. Controller receives request
3. Controller calls Service
4. Service applies business logic
5. Repository interacts with database
6. Service returns or throws exception
7. Controller sends response or forwards error
8. Global error handler formats response

---

## 📦 Technologies Used

* **Node.js**
* **Express**
* **TypeScript**
* **MongoDB**
* **Mongoose**

Optional future integrations:

* Zod (validation)
* Jest / Vitest (testing)
* Authentication (JWT)

---

## 🚀 How to Run the Project

```bash
npm install
npm run dev
```

Make sure MongoDB is running and environment variables are configured.

---

## 📌 Key Takeaways

* Clean Architecture is about **dependencies pointing inward**
* Domain and services should be framework-agnostic
* Controllers are not the place for business logic
* Repositories abstract data access
* Exceptions model business errors, not HTTP errors

---

## 👤 Author

Built by **argodev**

Focused on writing **clean, scalable, and professional backend code**.

---

## 🧭 Next Steps

* Add Zod schema validation
* Add unit tests for services
* Implement authentication & authorization
* Pagination and filtering
* API documentation (Swagger / OpenAPI)

---

This project is intentionally structured to resemble **real-world backend systems** used in professional environments.