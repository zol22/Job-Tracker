# Job Tracker Web App

The **Job Tracker Web App** is a full-stack application designed to help users efficiently manage and track job applications. Built with modern web technologies, it provides a user-friendly interface to organize job details, track statuses, and add notes, ensuring you stay on top of your job search.

---

## 🚀 Features

- **Job Management**: Add, edit, and delete job applications.
- **Status Tracking**: Update statuses like "Applied", "Interview Scheduled", and "Offer Received".
- **Reminders**: Set reminders for interviews and follow-ups.
- **Motivational Affirmations**: Log and save daily affirmations to stay motivated.
- **Responsive Design**: Mobile-friendly for seamless use across devices.

---

## 🛠️ Technologies Used

### **Frontend**
- **React & Next.js**: For building dynamic and server-rendered UI.
- **Tailwind CSS**: For modern, responsive, and customizable UI design.

### **Backend**
- **Node.js**: Backend runtime environment.
- **Express.js**: Handles API endpoints for CRUD operations.

### **Hosting**
- **Netlify**: Hosts the frontend.
- **Render**: Hosts the backend API.

---

## 📚 How to Use

### **1. Add a New Job**
- Enter the job title, company, description, and status using the intuitive form.

### **2. Track Job Progress**
- View job applications in a categorized table.
- Update statuses and add comments for better tracking.

### **3. Organize Reminders**
- Add reminders for interviews or follow-ups.

### **4. Stay Motivated**
- Log affirmations to stay focused during the job search.

---

## 💾 Installation

### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/job-tracker.git
   cd job-tracker/backend

2. Install dependencies:
   ```bash
   npm install

3. Run the server:
   ```bash
   node server.js
The backend runs on http://localhost:5000.

### **Frontend**
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev
The frontend runs on http://localhost:3000.


## 🌐 Deployment
### **Frontend:**
Deployed on Netlify: https://your-frontend.netlify.app

### **Backend:**
Deployed on Render: https://your-backend.onrender.com

## 📦 API Endpoints
Base URL: https://your-backend.onrender.com/api

| Endpoint  | Method | Description  | 
| ------------- | ------------- | ------------- | 
| /jobs  | GET | Fetch all job applications.  | 
| /jobs  | POST  | Add a new job application.  | 
| /jobs/:id | DELETE  | Delete a job application by ID.  | 
| /jobs/:id | PUT  | Update a job application by ID. | 
| /jobs/:id/status | PUT | Update job status and history.  | 
| /jobs/:id/comments| POST  | Add a comment to a job application.  | 

## 📋 Environment Variables
To run the project locally or deploy, set the following environment variables:

### **Frontend:**
- Create a .env.local file in the frontend directory:
  ```bash
  NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

### **Backend:**
- Create a .env file in the backend directory:
  ```bash
  PORT=5000
  CORS_ORIGIN=http://localhost:3000,https://your-frontend.netlify.app
  
## 🛠️ Future Enhancements
- Add authentication for multiple users.
- Integrate a database (e.g., MongoDB or PostgreSQL) for persistent storage.
- Add advanced filters and search capabilities.
- Include charts and analytics for job tracking.

## 🤝 Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m "Add a new feature").
4. Push the branch (git push origin feature-branch).
5. Open a Pull Request.

## ✨ Acknowledgments
- Netlify for hosting the frontend.
- Render for hosting the backend.
- Tailwind CSS for amazing UI design tools.

## 🔗 Links
- Live Frontend: https://silly-cucurucho-24341f.netlify.app/
- Live Backend: https://job-tracker-y8fc.onrender.com
- GitHub Repository: https://github.com/zol22/Job-Tracker



