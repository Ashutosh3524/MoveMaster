# MoveMaster

MoveMaster is a full-stack **MERN** (MongoDB, Express, React, Node.js) application designed for moving services, featuring a sleek and dynamic user experience with **Framer Motion**, **GSAP animations**, and **React Toastify** for clean notifications.

---

## ✨ Features

### 🔹 Public Features
- Fully **responsive** and mobile-friendly design.
- Smooth animations using **Framer Motion** and **GSAP**.
- Toast notifications via **React Toastify**.
- Pages include: Home, About Us, Services, Blog, Reviews, and Contact.
- Users can submit enquiries and reviews through the contact and review forms.

### 🏠 WebPage Screenshots
<img src="./assets/HomePage.png" alt="Homepage" width="500" /> <img src="./assets/About.png" alt="About" width="500" /> 
<img src="./assets/Contact.png" alt="Contact" width="500" /> <img src="./assets/Blogs.png" alt="Blogs" width="500" /> 
---

### 🔐 Admin Panel

<img src="./assets/DB4.png" alt="Admin" width="800" />

Accessible only via:
- **Email:** `admin@gmail.com`  
- **Password:** `Admin123`

Admin functionalities include:

#### ✅ Enquiries Management
- View all enquiries.
- **Mark as read/unread** (unread are visually highlighted).
- **Delete enquiries**.

#### ✅ Blog Management
- Add new blog posts with **image URLs**.
- View all blogs (only **published** blogs are shown on the public Blog page).
- **Update** existing blog posts.
- **Delete** blogs when needed.

#### ✅ Reviews Management
- View all submitted reviews (**newest at the top**).
- Delete inappropriate or outdated reviews.

#### ✅ Settings
- Update **contact email**.
- Update **business hours** displayed on the Contact page.

---

## 📦 Database Structure

The project uses **MongoDB** as the primary database. It consists of the following five collections:

| Collection Name | Purpose |
|------------------|---------|
| `contactdb`      | Stores all contact form enquiries submitted by users |
| `blogs`          | Contains blog posts including title, content, and meta info |
| `reviewdb`       | Stores user reviews with rating, message, and author details |
| `adminusers`      | Stores admin credentials for login and authentication |
| `settingsdb`     | Contains configurable app settings like banner text, social links, etc. |

---

### 🗃️ Screenshot of Collections in MongoDB Compass
<img src="./assets/DB1.png" width="800" /> 
<img src="./assets/DB2.png" width=800" />


## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Framer Motion, GSAP, Toastify
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Basic credential check (can be extended with JWT)

### 🎥 Demo Video

[Click here to watch the video on Google Drive](https://drive.google.com/drive/folders/1fi50aZpW0g33xfuVQMqkyW9aiNlV-A5l?usp=sharing)
