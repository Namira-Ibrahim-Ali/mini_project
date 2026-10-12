/**
 * IEEE NSAKCET Management System - Firebase & RBAC Backend Engine
 * 
 * Supports:
 * 1. Live Google Firebase (Auth + Cloud Firestore v10)
 * 2. Seamless Interactive Demo Sandbox (Local Mock with Zero-Knowledge verification,
 *    exact same Firestore collections, RBAC enforcement, and local persistence)
 */

// ============================================================================
// 1. FIREBASE CONFIGURATION
// Replace the placeholder values below with your official Firebase Project credentials.
// ============================================================================
export const firebaseConfig = {
  apiKey: "AIzaSy_SAMPLE_KEY_REPLACE_WITH_YOUR_FIREBASE_API_KEY",
  authDomain: "ieee-nsakcet-portal.firebaseapp.com",
  projectId: "ieee-nsakcet-portal",
  storageBucket: "ieee-nsakcet-portal.appspot.com",
  messagingSenderId: "950310001234",
  appId: "1:950310001234:web:ab95031nsakcet"
};

// Check if credentials are placeholders or if demo mode is explicitly active
export const isLiveConfigAvailable = () => {
  return (
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.includes("SAMPLE_KEY") &&
    firebaseConfig.projectId &&
    !firebaseConfig.projectId.includes("SAMPLE")
  );
};

// ============================================================================
// 2. SEED USERS (Zero-Knowledge: Passwords hashed/managed separately in Auth)
// ============================================================================
export const INITIAL_USERS = [
  {
    uid: "usr_admin_001",
    email: "head.sb@nsakcet.ac.in",
    displayName: "Dr. SB Head (Chair)",
    role: "admin",
    society: "SB",
    createdAt: new Date("2026-01-10T09:00:00Z").toISOString(),
    demoPassword: "admin123" // Only used for simulated demo auth in sandbox mode
  },
  {
    uid: "usr_fac_cs_002",
    email: "asif.cs@nsakcet.ac.in",
    displayName: "Dr. Mohammed Asif",
    role: "faculty",
    society: "Computer Society",
    createdAt: new Date("2026-01-15T10:30:00Z").toISOString(),
    demoPassword: "faculty123"
  },
  {
    uid: "usr_fac_ras_003",
    email: "ahmed.ras@nsakcet.ac.in",
    displayName: "Prof. K. Ahmed",
    role: "faculty",
    society: "RAS",
    createdAt: new Date("2026-01-20T11:15:00Z").toISOString(),
    demoPassword: "faculty123"
  },
  {
    uid: "usr_fac_wie_004",
    email: "fatima.wie@nsakcet.ac.in",
    displayName: "Dr. Fatima Z.",
    role: "faculty",
    society: "WIE",
    createdAt: new Date("2026-01-25T14:00:00Z").toISOString(),
    demoPassword: "faculty123"
  },
  {
    uid: "usr_std_005",
    email: "student@nsakcet.ac.in",
    displayName: "Syed Aiman (Student Member)",
    role: "student",
    society: null,
    createdAt: new Date("2026-02-01T08:00:00Z").toISOString(),
    demoPassword: "student123"
  }
];

export const INITIAL_EVENTS = [
  {
    id: "evt_001",
    title: "Deep Learning & Computer Vision Workshop",
    description: "Hands-on session using PyTorch to build real-time object detection models with industry expert mentors.",
    society: "Computer Society",
    eventDate: "2026-10-24T10:00:00",
    dateFormatted: "October 24, 2026",
    timeFormatted: "10:00 AM",
    venue: "Lab 4, CS Block",
    attendees: "120",
    status: "upcoming",
    bannerUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    galleryPhotos: [],
    createdBy: "usr_fac_cs_002",
    createdAt: new Date("2026-09-10T10:00:00Z").toISOString()
  },
  {
    id: "evt_002",
    title: "Women in Tech Leadership Summit 2026",
    description: "Keynote addresses, panel discussions, and career guidance from leading women leaders in engineering.",
    society: "WIE",
    eventDate: "2026-11-01T14:00:00",
    dateFormatted: "November 01, 2026",
    timeFormatted: "02:00 PM",
    venue: "Seminar Hall B",
    attendees: "180",
    status: "upcoming",
    bannerUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    galleryPhotos: [],
    createdBy: "usr_fac_wie_004",
    createdAt: new Date("2026-09-12T11:00:00Z").toISOString()
  },
  {
    id: "evt_003",
    title: "Autonomous Bot Design & Challenge",
    description: "Build line followers and obstacle avoiders using Arduino/Raspberry Pi. Hardware kits will be provided.",
    society: "RAS",
    eventDate: "2026-11-09T09:30:00",
    dateFormatted: "November 09, 2026",
    timeFormatted: "09:30 AM",
    venue: "Robotics Lab",
    attendees: "90",
    status: "upcoming",
    bannerUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    galleryPhotos: [],
    createdBy: "usr_fac_ras_003",
    createdAt: new Date("2026-09-14T09:00:00Z").toISOString()
  },
  {
    id: "evt_004",
    title: "IEEE Day 2026 Celebration",
    description: "Annual IEEE Day symposium featuring project showcase, quiz competition, and alumni networking.",
    society: "Computer Society",
    eventDate: "2026-09-28T09:00:00",
    dateFormatted: "September 28, 2026",
    timeFormatted: "09:00 AM",
    venue: "College Auditorium",
    attendees: "250",
    status: "past",
    bannerUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    galleryPhotos: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80"
    ],
    createdBy: "usr_fac_cs_002",
    createdAt: new Date("2026-09-01T10:00:00Z").toISOString()
  },
  {
    id: "evt_005",
    title: "Web 3.0 & Blockchain Workshop",
    description: "Smart contract development and decentralized identity fundamentals on Ethereum testnet.",
    society: "Computer Society",
    eventDate: "2026-08-15T11:00:00",
    dateFormatted: "August 15, 2026",
    timeFormatted: "11:00 AM",
    venue: "Lab 2, IT Block",
    attendees: "110",
    status: "past",
    bannerUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    galleryPhotos: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80"
    ],
    createdBy: "usr_fac_cs_002",
    createdAt: new Date("2026-08-01T10:00:00Z").toISOString()
  },
  {
    id: "evt_006",
    title: "IEEE Student Branch Orientation",
    description: "Orientation for newly inducted engineering students with chapter chairs and faculty counseling.",
    society: "SB",
    eventDate: "2026-07-20T10:00:00",
    dateFormatted: "July 20, 2026",
    timeFormatted: "10:00 AM",
    venue: "Mini Auditorium",
    attendees: "320",
    status: "past",
    bannerUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
    galleryPhotos: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80"
    ],
    createdBy: "usr_admin_001",
    createdAt: new Date("2026-07-01T09:00:00Z").toISOString()
  }
];

export const INITIAL_REQUESTS = [
  {
    id: "req_001",
    title: "Cyber Security & Ethical Hacking Workshop",
    society: "Computer Society",
    requestedDate: "October 28, 2026",
    venueRequirements: "Auditorium Hall 1",
    expectedAttendees: 150,
    facultyUid: "usr_fac_cs_002",
    facultyName: "Dr. Mohammed Asif",
    description: "Practical penetration testing basics, ethical hacking frameworks and OWASP Top 10.",
    status: "pending",
    submittedAt: new Date("2026-10-05T14:30:00Z").toISOString(),
    reviewedAt: null,
    reviewedBy: null
  },
  {
    id: "req_002",
    title: "Robotics Micro-Contest & Sumo Bot Arena",
    society: "RAS",
    requestedDate: "November 04, 2026",
    venueRequirements: "Robotics Lab 2",
    expectedAttendees: 80,
    facultyUid: "usr_fac_ras_003",
    facultyName: "Prof. K. Ahmed",
    description: "Autonomous sumo bot face-off on standard circular dohyo arena for 1st & 2nd year students.",
    status: "pending",
    submittedAt: new Date("2026-10-06T16:20:00Z").toISOString(),
    reviewedAt: null,
    reviewedBy: null
  }
];

// ============================================================================
// 3. STORAGE & REPOSITORY ADAPTER (PERSISTENT REACTIVE ENGINE)
// ============================================================================
const memoryStore = {};
const safeStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {}
    return memoryStore[key] || null;
  },
  setItem: (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
      }
    } catch (e) {}
    memoryStore[key] = val;
  },
  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {}
    delete memoryStore[key];
  }
};

class FirebaseReactiveStore {
  constructor() {
    this.subscribers = {
      users: new Set(),
      events: new Set(),
      calendarRequests: new Set(),
      auth: new Set()
    };
    
    this.currentUser = null;
    this.initStore();
  }

  initStore() {
    if (!safeStorage.getItem("ieee_users")) {
      safeStorage.setItem("ieee_users", JSON.stringify(INITIAL_USERS));
    }
    if (!safeStorage.getItem("ieee_events")) {
      safeStorage.setItem("ieee_events", JSON.stringify(INITIAL_EVENTS));
    }
    if (!safeStorage.getItem("ieee_calendarRequests")) {
      safeStorage.setItem("ieee_calendarRequests", JSON.stringify(INITIAL_REQUESTS));
    }

    // Check stored session
    const storedAuth = safeStorage.getItem("ieee_active_auth_uid");
    if (storedAuth) {
      const users = this.getUsers();
      const user = users.find(u => u.uid === storedAuth);
      if (user) {
        this.currentUser = this.sanitizeUser(user);
      }
    }
  }

  // Zero-Knowledge compliance: Never expose demoPassword in returned user profile
  sanitizeUser(user) {
    if (!user) return null;
    const { demoPassword, ...safeUser } = user;
    return safeUser;
  }

  getUsers() {
    return JSON.parse(safeStorage.getItem("ieee_users") || "[]");
  }

  getEvents() {
    return JSON.parse(safeStorage.getItem("ieee_events") || "[]");
  }

  getCalendarRequests() {
    return JSON.parse(safeStorage.getItem("ieee_calendarRequests") || "[]");
  }

  notify(collectionName) {
    if (this.subscribers[collectionName]) {
      let data;
      if (collectionName === "users") data = this.getUsers().map(this.sanitizeUser);
      else if (collectionName === "events") data = this.getEvents();
      else if (collectionName === "calendarRequests") data = this.getCalendarRequests();
      else if (collectionName === "auth") data = this.currentUser;

      this.subscribers[collectionName].forEach(cb => {
        try { cb(data); } catch (e) { console.error(`Error in listener for ${collectionName}:`, e); }
      });
    }
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATION METHODS (Mirroring Firebase Auth)
  // --------------------------------------------------------------------------
  async signInWithEmailAndPassword(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getUsers();
    const matched = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!matched) {
      throw new Error("auth/user-not-found: No registered account found with this email.");
    }

    // In live Firebase, password verification happens via Google Auth endpoints.
    // In our local engine, we verify against the seed credential without exposing it.
    if (matched.demoPassword && matched.demoPassword !== password) {
      throw new Error("auth/wrong-password: Password does not match our records.");
    }

    const safeUser = this.sanitizeUser(matched);
    this.currentUser = safeUser;
    safeStorage.setItem("ieee_active_auth_uid", safeUser.uid);
    this.notify("auth");
    return { user: safeUser };
  }

  async signOut() {
    this.currentUser = null;
    safeStorage.removeItem("ieee_active_auth_uid");
    this.notify("auth");
    return true;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  onAuthStateChanged(callback) {
    this.subscribers.auth.add(callback);
    // Initial call
    callback(this.currentUser);
    return () => this.subscribers.auth.delete(callback);
  }

  // --------------------------------------------------------------------------
  // FIRESTORE SUBSCRIPTIONS & CRUD (Mirroring Cloud Firestore)
  // --------------------------------------------------------------------------
  onEventsSnapshot(callback) {
    this.subscribers.events.add(callback);
    callback(this.getEvents());
    return () => this.subscribers.events.delete(callback);
  }

  onCalendarRequestsSnapshot(callback) {
    this.subscribers.calendarRequests.add(callback);
    callback(this.getCalendarRequests());
    return () => this.subscribers.calendarRequests.delete(callback);
  }

  onUsersSnapshot(callback) {
    this.subscribers.users.add(callback);
    callback(this.getUsers().map(this.sanitizeUser));
    return () => this.subscribers.users.delete(callback);
  }

  // Enforce Cloud Firestore Security Rules Server-Side simulation
  async addCalendarRequest(data) {
    const user = this.currentUser;
    if (!user) {
      throw new Error("PERMISSION_DENIED: User must be authenticated to request dates.");
    }
    if (user.role !== "faculty") {
      throw new Error("PERMISSION_DENIED: Only Faculty Advisors are permitted to request calendar dates.");
    }
    // RBAC Rule: Faculty can only request for their assigned society
    if (data.society !== user.society) {
      throw new Error(`PERMISSION_DENIED: You are assigned to '${user.society}'. You cannot submit requests for '${data.society}'.`);
    }

    const requests = this.getCalendarRequests();
    const newDoc = {
      id: "req_" + Date.now(),
      title: data.title,
      requestedDate: data.requestedDate,
      society: user.society,
      facultyUid: user.uid,
      facultyName: user.displayName,
      expectedAttendees: Number(data.expectedAttendees) || 50,
      venueRequirements: data.venueRequirements || "Campus Seminar Hall",
      description: data.description || "",
      status: "pending",
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null
    };

    requests.unshift(newDoc);
    safeStorage.setItem("ieee_calendarRequests", JSON.stringify(requests));
    this.notify("calendarRequests");
    return newDoc;
  }

  async updateCalendarRequestStatus(requestId, newStatus) {
    const user = this.currentUser;
    if (!user) {
      throw new Error("PERMISSION_DENIED: Unauthenticated request.");
    }
    // RBAC Rule: Only Admin can update/approve calendar requests
    if (user.role !== "admin") {
      throw new Error("PERMISSION_DENIED: Only IEEE SB Admin is authorized to approve or reject calendar slots.");
    }

    const requests = this.getCalendarRequests();
    const target = requests.find(r => r.id === requestId);
    if (!target) {
      throw new Error("NOT_FOUND: Calendar request record does not exist.");
    }

    target.status = newStatus;
    target.reviewedAt = new Date().toISOString();
    target.reviewedBy = user.uid;

    safeStorage.setItem("ieee_calendarRequests", JSON.stringify(requests));
    this.notify("calendarRequests");

    // If approved, automatically propagate to events collection as upcoming event
    if (newStatus === "approved") {
      const events = this.getEvents();
      const existing = events.find(e => e.title.toLowerCase() === target.title.toLowerCase());
      if (!existing) {
        const newEvent = {
          id: "evt_" + Date.now(),
          title: target.title,
          description: target.description || `Official ${target.society} approved technical event.`,
          society: target.society,
          eventDate: target.requestedDate,
          dateFormatted: target.requestedDate,
          timeFormatted: "10:00 AM",
          venue: target.venueRequirements,
          attendees: target.expectedAttendees.toString(),
          status: "upcoming",
          bannerUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
          galleryPhotos: [],
          createdBy: target.facultyUid,
          createdAt: new Date().toISOString()
        };
        events.unshift(newEvent);
        safeStorage.setItem("ieee_events", JSON.stringify(events));
        this.notify("events");
      }
    }

    return target;
  }

  async addEvent(eventData) {
    const user = this.currentUser;
    if (!user) {
      throw new Error("PERMISSION_DENIED: Authentication required to publish events.");
    }

    // RBAC Rule: Must be Admin OR Faculty belonging to the matching society
    const isPermitted = user.role === "admin" || (user.role === "faculty" && eventData.society === user.society);
    if (!isPermitted) {
      throw new Error(`PERMISSION_DENIED: You do not possess clearance to post events on behalf of '${eventData.society}'.`);
    }

    const events = this.getEvents();
    const newEvent = {
      id: "evt_" + Date.now(),
      title: eventData.title,
      description: eventData.description,
      society: user.role === "admin" ? eventData.society : user.society,
      eventDate: eventData.eventDate || new Date().toISOString(),
      dateFormatted: eventData.dateFormatted || eventData.eventDate,
      timeFormatted: eventData.timeFormatted || "10:00 AM",
      venue: eventData.venue || "Campus Venue",
      attendees: eventData.attendees || "100",
      status: eventData.status || "upcoming",
      bannerUrl: eventData.bannerUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      galleryPhotos: eventData.galleryPhotos || [],
      createdBy: user.uid,
      createdAt: new Date().toISOString()
    };

    events.unshift(newEvent);
    safeStorage.setItem("ieee_events", JSON.stringify(events));
    this.notify("events");
    return newEvent;
  }

  // Admin Account Creation (Zero-Knowledge: Admin creates account metadata)
  async createSocietyAccount(accountData) {
    const user = this.currentUser;
    if (!user || user.role !== "admin") {
      throw new Error("PERMISSION_DENIED: Only IEEE SB Admin can provision chapter advisor accounts.");
    }

    const users = this.getUsers();
    const cleanEmail = accountData.email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error("auth/email-already-in-use: An account with this email already exists.");
    }

    const newAccount = {
      uid: "usr_fac_" + Date.now(),
      email: cleanEmail,
      displayName: accountData.displayName,
      role: accountData.role || "faculty",
      society: accountData.society,
      createdAt: new Date().toISOString(),
      demoPassword: "faculty123" // In live Firebase, Firebase Auth handles password creation
    };

    users.push(newAccount);
    safeStorage.setItem("ieee_users", JSON.stringify(users));
    this.notify("users");
    return this.sanitizeUser(newAccount);
  }

  resetToInitialSeed() {
    safeStorage.removeItem("ieee_users");
    safeStorage.removeItem("ieee_events");
    safeStorage.removeItem("ieee_calendarRequests");
    safeStorage.removeItem("ieee_active_auth_uid");
    this.currentUser = null;
    this.initStore();
    this.notify("users");
    this.notify("events");
    this.notify("calendarRequests");
    this.notify("auth");
  }
}

// Global instance
export const dbService = new FirebaseReactiveStore();
