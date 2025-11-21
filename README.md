# 🎬 NodeJS + MongoDB Assignment: Anime & Studio API

> **Full Sail University – Web Development Degree**  
> **Student:** Phillip Cantu  
> **ID:** 0005394162  
> **Email:** <pvcantu@student.fullsail.edu>

## 📘 Overview

This project was built as part of **Full Sail University’s WDV353 - Server-Side Languages** course, Module 2.6: **NodeJS MongoDB Assignment**.  
It uses **Node.js**, **Express**, **TypeScript**, and **Mongoose**, and full **CRUD Operations** with **API Endpoints**.

## 🧠 Features

- CRUD functionality (GET, POST, PUT, DELETE) for both collections
- Relationship between **Anime** and **Studio** models
- Validation of MongoDB IDs and required fields
- Error handling with HTTP status codes
- Mongoose schema validation (e.g., min, max, required, maxlength)
- Endpoints tested using **Postman** and verified persistence in **MongoDB Compass**

## 🧱 Models

### 🎥 Anime Model

| Field         | Type                     | Validation                            |
| ------------- | ------------------------ | ------------------------------------- |
| title         | String                   | required, unique, trim, maxLength: 50 |
| year_released | Number                   | required                              |
| averageRating | Number                   | min: 1, max: 10                       |
| studio        | ObjectId (ref: "Studio") | optional                              |

#### Sample POST Anime JSON body

```JSON
{
  "title": "Jujutsu Kaisen",
  "year_released": 2020,
  "averageRating": 9,
  "studio": "691795a724962aed2661bf0a"
}
```

### 🏢 Studio Model

| Field        | Type    | Validation                            |
| ------------ | ------- | ------------------------------------- |
| name         | String  | required, unique, trim, maxLength: 50 |
| year_founded | Number  | required                              |
| headquarters | String  | required                              |
| website      | String  | required, maxLength: 300              |
| isActive     | Boolean | required                              |

#### Sample POST Studio JSON body

```JSON
  {
    "name": "Bones",
    "year_founded": 1998,
    "headquarters": "Suginami, Tokyo, Japan",
    "website": "bones.co.jp",
    "isActive": true
  }
```

## ⚙️ API Endpoints

### Anime Routes

| Method   | Endpoint            | Description        |
| -------- | ------------------- | ------------------ |
| `GET`    | `/api/v1/anime`     | Get all animes     |
| `GET`    | `/api/v1/anime/:id` | Get anime by ID    |
| `POST`   | `/api/v1/anime`     | Create a new anime |
| `PUT`    | `/api/v1/anime/:id` | Update an anime    |
| `DELETE` | `/api/v1/anime/:id` | Delete an anime    |

### Studio Routes

| Method   | Endpoint             | Description         |
| -------- | -------------------- | ------------------- |
| `GET`    | `/api/v1/studio`     | Get all studios     |
| `GET`    | `/api/v1/studio/:id` | Get studio by ID    |
| `POST`   | `/api/v1/studio`     | Create a new studio |
| `PUT`    | `/api/v1/studio/:id` | Update a studio     |
| `DELETE` | `/api/v1/studio/:id` | Delete a studio     |

## 🧩 Relationship Example

When creating or updating an Anime, send a Studio’s **ObjectId**:

```json
{
  "title": "Spirited Away",
  "year_released": 2001,
  "averageRating": 10,
  "studio": "670f82d09cc9bf19fbcd9b4f"
}
```

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Create `.env` file

**Example:**

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/anime_studios_db
PORT=5001
```

### 3️⃣ Run the server

```bash
cd Server
npm run dev
```

Server runs at: [http://localhost:5001](http://localhost:5001)

### 4️⃣ Run the client

```bash
cd Client
npm run dev
```

Client runs at: [http://localhost:5173/](http://localhost:5173/)

## 🧪 API Testing with Postman

This project includes a full **Postman Collection** for testing all API endpoints related to **Anime** and **Studio** CRUD operations.

### 🎬 Video Walkthroughs

Here's are very quick runthroughs of me running through app.

[Backend Video](https://youtu.be/FAsBPZ_3RqQ)
[Frontend Video](https://youtu.be/ukYUP8hDUQ0)

#### 📦 Included Postman File

- `Postman/Anime Studios.postman_collection.json`

#### ⚙️ What It Does

This Postman collection allows you to:

- Test all RESTful endpoints (`GET`, `POST`, `PUT`, `DELETE`)
- Validate request and response structures
- Run automated **Postman Tests** for verifying:
  - HTTP status codes (200, 201, 400, 404, etc.)
  - Response structure and field types using **Ajv JSON Schema validation**
  - Proper success or error messages
- Quickly confirm MongoDB persistence for new, updated, and deleted documents

#### 🚀 How to Use It

1. **Import the Collection**
   - Open Postman.
   - Click **Import** → **Files** → select `Studios-and-Animes.postman_collection.json`.
2. **Run Your Server**

   ```bash
   npm run dev
   ```

   Make sure it’s running on <http://localhost:5001>.

3. **Test Endpoints**

- Expand the **Anime Studios** collection.
- You'll see folders for **Studios** and **Animes**, each containing:
  - GET All
  - GET by Id
  - POST (Create)
  - PUT (Update)
  - DELETE (Remove)
    Click any request -> hit **Send** to test.

4. **View Test Results**

- Check the **Test REsults** tab after sending each request.
- Each endpoint includes custom verification assertions.

✅ **Notes**

- Make sure MongoDB is running locally before testing (mongod or via MongoDB Compass).
- Each API route automatically returns structured JSON responses for easier testing.
- The exported collection is designed to support manual and automated testing within Postman.

### 🧪 Jest Route Tests

Added basic Jest route tests hitting the _actual running API_ on localhost.

Structure:

```ts
import { describe, expect, test } from "@jest/globals";

const BASE_URL = "http://localhost:5001/api/v1/anime";

async function getData(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  expect(res.status).toBe(200);
  return res.json();
}

describe("GET /anime?sort=year_released", () => {
  test("returns animes sorted ASC", async () => {
    const data: any = await getData("?sort=year_released");
    const years = data.animes.map((a: any) => a.year_released);
    const sorted = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sorted);
  });
});
```

All Jest tests follow this template:

1. call the API
2. do 1–2 simple expectations

Note: You do need to have data within your local MongoDB to test.
