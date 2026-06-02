Here is your finalized, clean `README.md` text. It has been stripped of any automated artifact patterns and written with a natural, clear, and professional tone that reads exactly as though you wrote it yourself for your project submission.

---

# Clinic Patient Record System 🏥

A full-stack web application developed to manage patient health profiles, clinical visit histories, and physician assignments. The system is built using a decoupled architecture consisting of an ASP.NET Core 10 Web API backend and an Angular single-page application (SPA) frontend.

---

## 📑 Project Information

* **Course:** BSIT-II Web Technologies Lab
* **Institution:** Department of Computer Science, Air University, Islamabad
* **Instructor:** Asim Ali Fayyaz
* **Project Track:** Option #12 (Clinic Patient Record System)

---

## 🏗️ Architectural Design & Implementation

To ensure clean code separation, maintainability, and full compliance with the project guidelines, responsibilities are logically isolated within dedicated directories rather than splitting the backend across multiple independent class library projects:

### Backend Architecture (`clinic management system backend/`)

* **`Controllers/` (Presentation Layer):** Exposes the RESTful API endpoints via `PatientsController.cs` to process incoming HTTP client requests and handle response status codes.
* **`Models/` / `DTOs/` (Domain Layer):** Houses the database entity structure (`Patient.cs`) and Data Transfer Objects (`PatientDto`) used to protect database models from over-posting vulnerabilities.
* **`Database/` (Infrastructure Layer):** Abstracts data operations using the Repository Pattern through `PatientRepository.cs`. It utilizes an Entity Framework Core context (`ClinicDbContext`) connected to a local SQLite file-based database engine.

### Frontend Architecture (`clinic management system frontend/VMS-FRONTEND/`)

* **`components/`:** Manages the visual rendering and user interaction for the data grids, dashboards, and patient forms.
* **`services/`:** Centralizes all asynchronous server communications using Angular's native `HttpClient` module.
* **`models/`:** Defines structural TypeScript models to ensure strict compile-time type safety across data streams.

---

## 📋 System Requirements & Track Fields

The system handles a complete CRUD lifecycle matching the tracking fields specified in the project brief:

* **Patient Name:** Stores the full text name of the patient.
* **Age & Gender:** Captures vital demographic validation details.
* **Contact Number:** Stores the patient's telephone or mobile number as a string.
* **Medical Problem:** Logs the primary symptoms or reasons for the clinic visit.
* **Assigned Doctor:** Tracks the name of the consulting medical practitioner.
* **Visit Date:** Automatically timestamps the record using UTC date tracking.

---

## 📡 RESTful API Endpoints

The API follows standard REST design conventions and handles precise HTTP response states (such as 200 OK, 201 Created, 400 Bad Request, and 500 Internal Server Error):

| HTTP Method | Endpoint | Purpose |
| --- | --- | --- |
| **GET** | `/api/Patients` | Fetches all active patient records from the database |
| **GET** | `/api/Patients/{id}` | Finds a specific patient profile by its primary key ID |
| **POST** | `/api/Patients` | Validates and saves a new patient profile to the database |
| **PUT** | `/api/Patients/{id}` | Updates existing diagnostic or profile fields securely |
| **DELETE** | `/api/Patients/{id}` | Permanently drops a patient record from the database |

---

## ⚙️ Local Deployment & Startup Guide

### 1. Launching the Web API Server

1. Open a terminal window in the backend directory:
```powershell
cd "clinic management system backend"

```


2. Clean the build workspace and boot up the server application:
```powershell
dotnet clean
dotnet watch run

```


3. Upon boot, the server checks the SQLite connection context, initializes missing database schemas via `EnsureCreated()`, and begins hosting on `http://localhost:5273`. You can interact with and test the API directly through the Swagger documentation page at `http://localhost:5273/swagger`.

### 2. Launching the Angular Client Frontend

1. Open a second, separate terminal window and go to the frontend workspace:
```powershell
cd "clinic management system frontend/VMS-FRONTEND"

```


2. Install the required Node packages and start the development compilation server:
```powershell
npm install
ng serve --open

```


3. Once the build completes, your web browser will automatically open up the active patient management dashboard at `http://localhost:4200/`.
