# Campus Food Ordering System
CP317 Group 9 — Winter 2026

## Prerequisites

### Java 21

#### Mac/Linux
1. Download Java 21 from https://adoptium.net
2. Select **Temurin 21 (LTS)**, macOS, your architecture (Apple Silicon = aarch64, Intel = x64)
3. Download the `.pkg` file and run it
4. Verify installation:
```
java -version
```
You should see `openjdk version "21"`

#### Windows
1. Download Java 21 from https://adoptium.net
2. Select **Temurin 21 (LTS)**, Windows, x64
3. Download the `.msi` file and run it
4. Check the box that says **Set JAVA_HOME variable** during installation
5. Verify installation by opening Command Prompt:
```
java -version
```
You should see `openjdk version "21"`

---

### Node.js (for frontend)

#### Mac/Linux
1. Download from https://nodejs.org
2. Select the **LTS** version
3. Download the `.pkg` file and run it
4. Verify:
```
node -v
npm -v
```

#### Windows
1. Download from https://nodejs.org
2. Select the **LTS** version
3. Download the `.msi` file and run it
4. Verify by opening Command Prompt:
```
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repo
```
git clone https://github.com/kavi742/cp317-group-9-campus-food-ordering.git
cd cp317-group-9-campus-food-ordering
```

### 2. Check out the dev branch
```
git checkout dev
```

### 3. Create your feature branch
```
git checkout -b feature/{your-feature-name}
```

### 4. Install frontend dependencies
```
cd frontend
npm install
cd ..
```

---

## Running the Backend

### Mac/Linux
```
./gradlew bootRun
```

### Windows
```
.\gradlew.bat bootRun
```

Backend runs on http://localhost:8080

---

## Running the Frontend

### Mac/Linux and Windows
```
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

You need the backend running at the same time in a separate terminal.

---

## Running Both at the Same Time

Open two terminals:

**Terminal 1 — Backend**

Mac/Linux:
```
./gradlew bootRun
```
Windows:
```
gradlew.bat bootRun
```

**Terminal 2 — Frontend**
```
cd frontend
npm run dev
```

---

## Running Tests

### Mac/Linux
```
./gradlew test
```

### Windows
```
gradlew.bat test
```

Test results are saved to:
```
build/reports/tests/test/index.html
```
Open that file in a browser to see the full report.

---

## API Documentation

With the backend running, open:
```
http://localhost:8080/swagger-ui.html
```

This shows all available endpoints and lets you test them directly in the browser.

All API responses follow this standard format:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

---

## H2 Database Console

With the backend running, open:
```
http://localhost:8080/h2-console
```

Use these credentials:
```
JDBC URL:  jdbc:h2:mem:cafedemo
User Name: sa
Password:  (leave blank)
```

Useful queries:
```sql
SELECT * FROM USERS;
SELECT * FROM MENU_ITEM;
SELECT * FROM ORDERS;
SELECT * FROM ORDER_ITEM;
```

---

## Test Accounts

Use these accounts to test each role:
```
CUSTOMER  --  email: alice@school.ca   password: pass123
EMPLOYEE  --  email: bob@school.ca     password: pass123
MANAGER   --  email: carol@school.ca   password: pass123
```

---

## Project Structure
```
cp317-group-9-campus-food-ordering/
  src/
    main/java/com/cp317/group9/campus_cafe/
      controller/       -- API endpoints
      service/          -- Business logic (interfaces + implementations)
      repository/       -- Database access
      model/            -- Data models (all extend BaseEntity)
      config/           -- CORS configuration
    resources/
      application.properties
      data.sql          -- Seed data
  src/
    test/java/com/cp317/group9/campus_cafe/
      service/          -- Unit tests
  frontend/
    src/
      pages/            -- React pages
      components/       -- Shared components (Navbar)
    vite.config.js      -- Vite config with proxy to backend
    package.json
```

---

## OOP Design

The backend demonstrates the following OOP principles:

**Inheritance** — All model classes (`User`, `MenuItem`, `Order`, `OrderItem`) extend `BaseEntity` which provides `id`, `createdAt`, and `updatedAt` fields automatically.

**Abstraction** — Each service has an interface (`MenuServiceInterface`, `UserServiceInterface`, `OrderServiceInterface`) that defines the contract. Controllers depend on interfaces, not implementations.

**Encapsulation** — The `Order` model owns its own status validation logic through `updateStatus()`, which rejects invalid status values before they reach the database.

**Polymorphism** — `ApiResponse<T>` is a generic wrapper that works with any return type across all endpoints.

---

## Order Status Flow
```
CONFIRMED -> PREPARING -> READY -> FULFILLED
```

---

## Payment Simulation

The payment processor is simulated via `PaymentService`. It is currently set to approve all payments. No real payment information is required — simply select a payment method at checkout and submit.

---

## Branching Rules

- Never commit directly to `main` or `dev`
- Always branch off `dev`
- Name your branch `feature/your-feature-name`
- Open a pull request into `dev` when your feature is done
- `main` is reserved for final stable releases only

---

## Common Issues

**gradlew: Permission denied (Mac/Linux)**
```
chmod +x gradlew
```

**Port 8080 already in use (Mac/Linux)**
```
lsof -i :8080
kill -9 <PID>
```

**Port 8080 already in use (Windows)**
```
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Port 5173 already in use (Mac/Linux)**
```
lsof -i :5173
kill -9 <PID>
```

**Port 5173 already in use (Windows)**
```
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**npm install fails**
```
rm -rf frontend/node_modules
cd frontend
npm install
```

**CORS error on API calls**

Make sure the backend is running on port 8080 and that `CorsConfig.java` includes `http://localhost:5173` as an allowed origin.

**H2 database is empty after restart**

H2 is an in-memory database. All data is wiped when the backend restarts. Re-run the seed data by restarting the backend — `data.sql` runs automatically on startup.
