### **How to Run the Backend (Spring Boot) and Frontend (React)**

---

#### **Hosted Version**
The application is hosted and accessible at:  
**[http://my-bucket-baraa.s3-website.us-east-2.amazonaws.com/](http://my-bucket-baraa.s3-website.us-east-2.amazonaws.com/)**

---

#### **If You Wish to Run It on Your Machine**

---

#### **1. Running the Backend (Spring Boot)**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project using Maven:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080` by default.

---

#### **2. Running the Frontend (React)**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000` by default.
