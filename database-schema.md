# Database Schema & Role-Based Access Control (RBAC) Specification
## IEEE NSAKCET Event Management System

---

## 1. System Overview & Security Principles

The IEEE NSAKCET Event Management System enforces a strict multi-tier Role-Based Access Control (RBAC) architecture integrated with Firebase (Authentication & Cloud Firestore).

### Key Architectural Tenets:
1. **Zero-Knowledge Password Architecture**:
   - Authentication is offloaded to Firebase Auth. Passwords undergo irreversible multi-round salted cryptographic hashing (Scrypt / PBKDF2) at the authentication provider level.
   - Cloud Firestore documents in `/users` contain **zero** plaintext passwords or password hashes.
   - Neither IEEE Student Branch Head administrators nor any portal users have read access to credential hashes.
   - Admins interact strictly with account metadata (`displayName`, `email`, `role`, `society`, `createdAt`).

2. **Server-Enforced RBAC**:
   - Frontend UI rendering adapts dynamically to user roles, but all authorization is enforced on the database layer via **Cloud Firestore Security Rules**.
   - Faculty Advisors are strictly scoped to their assigned society/chapter. Even if a faculty member attempts to submit an event for another chapter via API tampering, the database security rule rejects the write.

---

## 2. Collections Schema Definition

### A. `users` Collection
Path: `/users/{uid}`

| Field | Data Type | Description | Constraints / Enums |
|---|---|---|---|
| `uid` | String | Unique Firebase Auth identifier | Primary Key (matches `request.auth.uid`) |
| `email` | String | Official institutional email address | Valid email format |
| `displayName` | String | Full name and title (e.g., "Dr. Mohammed Asif") | Required |
| `role` | String | Security role determining portal privileges | Enum: `"student"`, `"faculty"`, `"admin"` |
| `society` | String \| null | Assigned IEEE Society / Chapter | `"Computer Society"`, `"RAS"`, `"WIE"`, `"SB"` (null for students) |
| `createdAt` | Timestamp | Account creation timestamp | Defaults to server timestamp |

#### Zero-Knowledge Privacy Guarantee:
- No `password`, `salt`, or `hash` attributes exist within this collection.
- Account credentials remain isolated inside Google Firebase Identity Platform.

---

### B. `events` Collection
Path: `/events/{id}`

| Field | Data Type | Description | Constraints / Enums |
|---|---|---|---|
| `id` | String | Document identifier | Primary Key (Auto-generated or UUID) |
| `title` | String | Event headline (e.g., "Deep Learning Workshop") | Required |
| `description` | Text / String | Detailed agenda, objectives, prerequisites | Required |
| `society` | String | Hosting chapter / society | Must match author's assigned society |
| `eventDate` | Timestamp / ISO | Scheduled event start date & time | Required |
| `status` | String | Publication lifecycle state | Enum: `"upcoming"`, `"past"` |
| `bannerUrl` | String | Header banner image URL (Unsplash/Firebase Storage)| Valid URL |
| `galleryPhotos` | Array of Strings | Array of image URLs for past event recap album | Array of valid image URLs |
| `venue` | String | Physical / Virtual location (e.g. "Lab 4, CS Block")| Required |
| `attendees` | Number / String | Anticipated or confirmed attendance | e.g., "120" |
| `createdBy` | String | User `uid` of author | Must match `request.auth.uid` |
| `createdAt` | Timestamp | Timestamp of publication | Server timestamp |

---

### C. `calendarRequests` Collection
Path: `/calendarRequests/{id}`

| Field | Data Type | Description | Constraints / Enums |
|---|---|---|---|
| `id` | String | Document identifier | Primary Key |
| `title` | String | Proposed event title | Required |
| `requestedDate` | Timestamp / String | Target calendar date requested | Required |
| `society` | String | Requesting society/chapter | Must match faculty's assigned society |
| `facultyUid` | String | `uid` of the requesting Faculty Advisor | Must match `request.auth.uid` |
| `facultyName` | String | Name of faculty advisor | Required |
| `expectedAttendees`| Number | Estimated student turnout | > 0 |
| `venueRequirements`| String | Preferred campus facility | e.g. "Main Auditorium" |
| `description` | String | Brief rationale and outline | Optional/Recommended |
| `status` | String | Approval workflow stage | Enum: `"pending"`, `"approved"`, `"rejected"` |
| `submittedAt` | Timestamp | Timestamp of submission | Server timestamp |
| `reviewedAt` | Timestamp \| null | Timestamp of approval/rejection | Set when admin acts |
| `reviewedBy` | String \| null | Admin `uid` who approved/rejected | Set when admin acts |

---

## 3. Role-Based Access Control (RBAC) Matrix

| Entity / Action | Public / Student | Faculty Advisor | IEEE SB Admin |
|---|---|---|---|
| **View Student Portal** | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| **Browse Events Hub** | ✅ Read (`events`) | ✅ Read (`events`) | ✅ Read (`events`) |
| **Use AI Chatbot** | ✅ Context-aware queries | ✅ Context-aware queries | ✅ Context-aware queries |
| **View Faculty Portal** | ❌ Blocked | ✅ Full Access | ❌ Hidden (Admin portal preferred) |
| **Submit Calendar Request** | ❌ Denied | ✅ Allowed (Own Society Only) | ❌ N/A (Admin approves) |
| **View Calendar Requests** | ❌ Denied | ✅ Own Submissions Only | ✅ All Submissions (Approval Queue) |
| **Approve/Reject Calendar** | ❌ Denied | ❌ Denied | ✅ Allowed (Full Control) |
| **Publish Events** | ❌ Denied | ✅ Allowed (Own Society Only) | ✅ Allowed (Any Society) |
| **View Admin Portal** | ❌ Blocked | ❌ Blocked | ✅ Full Access |
| **View Society Accounts** | ❌ Denied | ❌ Denied | ✅ Metadata only (Zero-Knowledge) |
| **Manage User Accounts** | ❌ Denied | ❌ Denied | ✅ Admin Write |

---

## 4. Firebase Cloud Firestore Security Rules

Deployed in `firestore.rules`:

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

    // 1. Public Events Hub
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

    // 2. Calendar Allocation Requests
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

    // 3. User Directory (Zero-Knowledge)
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
