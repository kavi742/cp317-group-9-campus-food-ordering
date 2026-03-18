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

---

## Running the Backend

### Mac/Linux
```
./gradlew bootRun
```

### Windows
```
gradlew.bat bootRun
```

Backend runs on http://localhost:8080

---

## Running the Frontend

### Mac/Linux and Windows
```
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

You need the backend running at the same time in a separate terminal.

---

## Running Both at the Same Time

Open two terminals:

**Terminal 1 — Backend**
```
./gradlew bootRun
or
On Windows
gradlew.bat bootRun
```

**Terminal 2 — Frontend**
```
cd frontend
npm install
npm start
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

---

## Project Structure
cp317-group-9-campus-food-ordering/
  src/
    main/java/com/cp317/group9/campus_cafe/
      controller/       -- API endpoints
      service/          -- Business logic
      repository/       -- Database access
      model/            -- Data models
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
    package.json
```

---

## Branching Rules

- Never commit directly to `main` or `dev`
- Always branch off `dev`
- Name your branch `feature/your-feature-name`
- Open a pull request into `dev` when your feature is done
- `main` is reserved for final stable releases only

---

## Order Status Flow
```
CONFIRMED -> PREPARING -> READY -> FULFILLED
```

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

**npm install fails**
Delete `node_modules` and try again:
```
rm -rf frontend/node_modules
cd frontend
npm install
```
