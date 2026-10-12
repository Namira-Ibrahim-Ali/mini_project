/**
 * Standalone Seed Data Definition and Node.js Firebase Seeder Script
 * Usage in Node: node seed-data.js
 */

const SEED_USERS = [
  {
    uid: "usr_admin_001",
    email: "head.sb@nsakcet.ac.in",
    displayName: "Dr. SB Head (Chair)",
    role: "admin",
    society: "SB",
    createdAt: new Date("2026-01-10T09:00:00Z").toISOString()
  },
  {
    uid: "usr_fac_cs_002",
    email: "asif.cs@nsakcet.ac.in",
    displayName: "Dr. Mohammed Asif",
    role: "faculty",
    society: "Computer Society",
    createdAt: new Date("2026-01-15T10:30:00Z").toISOString()
  },
  {
    uid: "usr_fac_ras_003",
    email: "ahmed.ras@nsakcet.ac.in",
    displayName: "Prof. K. Ahmed",
    role: "faculty",
    society: "RAS",
    createdAt: new Date("2026-01-20T11:15:00Z").toISOString()
  },
  {
    uid: "usr_fac_wie_004",
    email: "fatima.wie@nsakcet.ac.in",
    displayName: "Dr. Fatima Z.",
    role: "faculty",
    society: "WIE",
    createdAt: new Date("2026-01-25T14:00:00Z").toISOString()
  },
  {
    uid: "usr_std_005",
    email: "student@nsakcet.ac.in",
    displayName: "Syed Aiman",
    role: "student",
    society: null,
    createdAt: new Date("2026-02-01T08:00:00Z").toISOString()
  }
];

const SEED_EVENTS = [
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
  }
];

const SEED_REQUESTS = [
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
    submittedAt: new Date("2026-10-05T14:30:00Z").toISOString()
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
    submittedAt: new Date("2026-10-06T16:20:00Z").toISOString()
  }
];

console.log("=================================================================");
console.log(" IEEE NSAKCET Firestore Initial Seed Manifest");
console.log("=================================================================");
console.log(`Users count: ${SEED_USERS.length}`);
console.log(`Events count: ${SEED_EVENTS.length}`);
console.log(`Calendar requests count: ${SEED_REQUESTS.length}`);
console.log("\nSample User (Zero-Knowledge: Notice no password fields in schema):");
console.log(SEED_USERS[0]);

module.exports = {
  SEED_USERS,
  SEED_EVENTS,
  SEED_REQUESTS
};
