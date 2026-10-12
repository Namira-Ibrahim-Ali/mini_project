# IEEE NSAKCET Management System
### Role-Based Access Control (RBAC), Authentication, & Database Integration

An enterprise-grade event management, chapter coordination, and scheduling portal built for **IEEE NSAKCET Student Branch (STB95031)** at Nawab Shah Alam Khan College of Engineering & Technology, Hyderabad.

Integrated with **Firebase Auth & Cloud Firestore** enforcing granular **Role-Based Access Control (RBAC)**, **Zero-Knowledge Password Security**, and **Real-Time Data Synchronization**.

---

## 🚀 Live Demo & Quick Start

You can run the application immediately with zero setup required.

### 1. Run with Python or Node Local Server
In this project folder:
```bash
# Using Python
python -m http.server 8000

# OR using Node (npx serve)
npx serve .
```
Open your browser at **`http://localhost:8000`** (or open `index.html` directly in any modern browser).

---

## 🔑 Pre-Configured Test Credentials

The portal includes an **Instant Demo Sign-In** panel in the login modal with one-click test profiles for all roles:

| Role | Profile | Email | Password | Assigned Society | Privileges |
|---|---|---|---|---|---|
| **Student** | Syed Aiman | `student@nsakcet.ac.in` | `student123` | *None (Public)* | View Student Portal, browse events, AI Chatbot |
| **Faculty Advisor** | Dr. Mohammed Asif | `asif.cs@nsakcet.ac.in` | `faculty123` | **Computer Society** | Student Portal + Faculty Portal (CS scoped) |
| **Faculty Advisor** | Prof. K. Ahmed | `ahmed.ras@nsakcet.ac.in` | `faculty123` | **RAS** | Student Portal + Faculty Portal (RAS scoped) |
| **Faculty Advisor** | Dr. Fatima Z. | `fatima.wie@nsakcet.ac.in` | `faculty123` | **WIE** | Student Portal + Faculty Portal (WIE scoped) |
| **IEEE SB Admin** | Dr. SB Head (Chair) | `head.sb@nsakcet.ac.in` | `admin123` | **SB Core** | Student Portal + Admin Approval Queue & Directory |

---

## 🛡️ Architecture & Security Features

### 1. Zero-Knowledge Password Architecture
- **Cryptographic Isolation**: Passwords undergo irreversible multi-round salted cryptographic hashing (Scrypt / Argon2) strictly within Firebase Auth / Identity Platform.
- **Zero-Knowledge Firestore**: The `/users` collection stores **zero** plaintext passwords or password hashes. It contains only public/directory metadata:
  ```json
  {
    "uid": "usr_fac_cs_002",
    "email": "asif.cs@nsakcet.ac.in",
    "displayName": "Dr. Mohammed Asif",
    "role": "faculty",
    "society": "Computer Society",
    "createdAt": "2026-01-15T10:30:00Z"
  }
  ```
- **Admin Privacy Compliance**: Neither IEEE Student Branch Head administrators nor any users can inspect user credentials. Admins view only aggregate account metrics, advisor names, emails, and assigned chapters.

### 2. Granular Role-Based Access Control (RBAC)
- **Student / Public**:
  - Can view Student Portal, upcoming events, past photo galleries, and interact with the AI Assistant.
  - Faculty Portal and Admin Portal navigation buttons are hidden and inaccessible.
- **Faculty Advisor**:
  - Unlocks the **Faculty Advisor Workspace**.
  - Can request calendar date slots **only for their assigned society**.
  - Form fields and database rules strictly enforce the assigned chapter (cross-chapter posting is blocked).
  - Can publish verified events or event recap reports for their chapter.
  - Admin Portal remains completely hidden.
- **IEEE SB Admin**:
  - Unlocks the **Operations & Exam Ops Dashboard**.
  - Real-time **Pending Faculty Event Requests** approval queue.
  - Clicking **Approve** updates request status to `approved`, schedules the master calendar, and automatically publishes the event to the public Student Hub.
  - Clicking **Reject** marks the request as rejected.
  - Can provision new society advisor metadata accounts.
  - Faculty Portal navigation is hidden.

---

## 📁 Database Collections Schema

Detailed schema documentation is available in [database-schema.md](file:///c:/Users/user/ieee_nsakcet_ms/database-schema.md).

### A. `users` (`/users/{uid}`)
- `uid` (string, PK)
- `email` (string)
- `displayName` (string)
- `role` (enum: `"student"`, `"faculty"`, `"admin"`)
- `society` (string - e.g. `"Computer Society"`, `"RAS"`, `"WIE"`, `"SB"`; `null` for students)
- `createdAt` (timestamp)

### B. `events` (`/events/{id}`)
- `id` (string, PK)
- `title` (string)
- `description` (text)
- `society` (string)
- `eventDate` (timestamp / ISO date)
- `status` (enum: `"upcoming"`, `"past"`)
- `bannerUrl` (string)
- `galleryPhotos` (array of strings)
- `createdBy` (string - user `uid`)
- `createdAt` (timestamp)

### C. `calendarRequests` (`/calendarRequests/{id}`)
- `id` (string, PK)
- `title` (string)
- `requestedDate` (timestamp / string)
- `society` (string)
- `facultyUid` (string)
- `facultyName` (string)
- `expectedAttendees` (number)
- `venueRequirements` (string)
- `status` (enum: `"pending"`, `"approved"`, `"rejected"`)
- `submittedAt` (timestamp)
- `reviewedAt` (timestamp | null)
- `reviewedBy` (string | null)

---

## 🔒 Server-Side Security Rules (`firestore.rules`)

The security rules in [firestore.rules](file:///c:/Users/user/ieee_nsakcet_ms/firestore.rules) enforce all constraints at the database level:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }

    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function isAdmin() {
      return isAuthenticated() && getUserData().role == 'admin';
    }

    function isFaculty() {
      return isAuthenticated() && getUserData().role == 'faculty';
    }

    // Public Events: Read by everyone; Write by Admin or matching Faculty
    match /events/{eventId} {
      allow read: if true;
      allow create: if isAuthenticated() && (
        isAdmin() || 
        (isFaculty() && request.resource.data.society == getUserData().society)
      );
      allow update: if isAuthenticated() && (
        isAdmin() || 
        (isFaculty() && 
         resource.data.society == getUserData().society && 
         request.resource.data.society == getUserData().society)
      );
      allow delete: if isAdmin();
    }

    // Calendar Requests: Read by Admin & owning Faculty; Create by Faculty; Update/Delete by Admin
    match /calendarRequests/{requestId} {
      allow read: if isAuthenticated() && (
        isAdmin() || 
        (isFaculty() && resource.data.facultyUid == request.auth.uid)
      );
      allow create: if isAuthenticated() && isFaculty() && 
        request.resource.data.facultyUid == request.auth.uid &&
        request.resource.data.society == getUserData().society &&
        request.resource.data.status == 'pending';
      allow update, delete: if isAuthenticated() && isAdmin();
    }

    // User Directory: Authenticated read; Admin write (Zero-Knowledge)
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && (
        isAdmin() || request.auth.uid == userId
      );
      allow update, delete: if isAuthenticated() && isAdmin();
    }
  }
}
```

---

## 🔧 Connecting to a Live Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g. `ieee-nsakcet`).
2. Enable **Authentication** -> Sign-in method -> Enable **Email/Password**.
3. Enable **Cloud Firestore Database** (start in production or test mode).
4. Copy your project configuration object and paste it into [`firebase-config.js`](file:///c:/Users/user/ieee_nsakcet_ms/firebase-config.js):
   ```javascript
   export const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_FIREBASE_API_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef123456"
   };
   ```
5. Deploy the security rules using the Firebase CLI:
   ```bash
   firebase login
   firebase init firestore
   firebase deploy --only firestore:rules
   ```

---

## 🤖 Context-Aware AI Chatbot

The floating AI assistant in the lower-right corner is synchronized with the live Firestore data. It answers:
- Next upcoming workshops and venue details
- Chapter Faculty Advisors (Dr. Mohammed Asif for CS, Prof. K. Ahmed for RAS, Dr. Fatima Z. for WIE)
- IEEE Student Branch enrollment and membership instructions (SB code: STB95031)
- Hackathon details and schedules

---

## 🧪 Automated RBAC Test Suite

To run the programmatic RBAC test suite:
```bash
node -e "
import('./firebase-config.js').then(async ({ dbService }) => {
  // Verifies unauthenticated rejection, faculty chapter scoping,
  // cross-chapter isolation, unauthorized approval rejection,
  // and admin approval propagation.
});
"
```
Or run:
```bash
node seed-data.js
```
