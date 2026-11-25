/**
 * AITAM knowledge base.
 *
 * This is the single source of truth the assistant answers from today.
 * Each entry is a self-contained, retrievable document, so the same shape can
 * later be embedded into a vector database for full RAG (see retriever.ts):
 * add PDFs, notices, or scraped website content as extra `KnowledgeDocument`s
 * from any source without touching the chat route or the UI.
 */
export type KnowledgeCategory =
  | "overview"
  | "administration"
  | "departments"
  | "courses"
  | "admissions"
  | "faculty"
  | "placements"
  | "hostel"
  | "transport"
  | "library"
  | "laboratories"
  | "clubs"
  | "events"
  | "examinations"
  | "academic-calendar"
  | "notices"
  | "contact"
  | "facilities";

export type KnowledgeDocument = {
  id: string;
  category: KnowledgeCategory;
  title: string;
  /** Extra retrieval hints (synonyms, abbreviations, common phrasings). */
  keywords: string[];
  content: string;
  source?: string;
};

const OFFICIAL_SITE = "https://www.adityatekkali.edu.in";

export const KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: "overview",
    category: "overview",
    title: "About AITAM",
    keywords: [
      "about",
      "college",
      "institute",
      "aitam",
      "history",
      "vision",
      "mission",
      "accreditation",
      "naac",
      "nba",
      "autonomous",
      "affiliation",
      "ranking",
      "location",
      "campus",
    ],
    content: `Aditya Institute of Technology and Management (AITAM) is an autonomous engineering institution located at K. Kotturu, Tekkali, Srikakulam district, Andhra Pradesh, India. It was established in 2001 by the Aditya Educational Academy.

Key facts commonly asked about:
- Autonomous status granted by UGC, with academic affiliation to Jawaharlal Nehru Technological University (JNTU) Gurajada, Vizianagaram.
- Approved by AICTE, New Delhi.
- Accredited by NAAC, with several engineering programmes accredited by NBA.
- The campus spans a large green site on the Kotturu-Tekkali road, roughly 100 km from Visakhapatnam and around 25 km from Srikakulam town.
- The institute focuses on outcome-based education, industry-linked training, research centres, incubation, and student innovation.

Vision and mission statements, current rankings, and accreditation validity are published on the official website: ${OFFICIAL_SITE}`,
    source: OFFICIAL_SITE,
  },
    {
    id: "administration",
    category: "administration",
    title: "AITAM Administration and Current Heads",
    keywords: [
      "administration",
      "director",
      "principal",
      "hod",
      "head",
      "head of department",
      "department head",
      "current hod",
      "current director",
      "current principal",
      "cse hod",
      "csm hod",
      "csd hod",
      "cyber security hod",
      "ece hod",
      "eee hod",
      "it hod",
      "mechanical hod",
      "mech hod",
      "civil hod",
      "bsh hod",
      "mba hod",
      "bba hod",
      "mca hod",
      "bca hod",
    ],
    content: `Current AITAM administration and department heads:

Institute Administration:
- Director: Prof. V. V. Nageswara Rao
- Principal: Dr. A. S. Srinivasa Rao
- Director (R&D): Dr. Debnath Bhattacharyya
- Dean Academics: Dr. B. Venkata Ramana
- Dean Development & Planning: Dr. U. D. Prasan
- Dean Admin (CSE & Allied Branches): Dr. G. Prasanna Lakshmi
- Dean (IQAC): Dr. Ch. Ramesh
- Dean - Student Affairs: Dr. R. Santhi Kumar
- Dean R&D: Dr. D. Sreeramulu

Current Heads of Departments:
- CSE: Dr. Yegireddi Ramesh
- CSM (Computer Science and Engineering - AI & ML): Dr. M. V. B. Chandrasekhar
- CSD & CSC (Computer Science and Engineering - Data Science and Cyber Security): Dr. Naresh Tangudu
- ECE: Dr. V. Ashok Kumar
- Mechanical Engineering: Dr. P. Srihari
- Information Technology (IT): Dr. B. Rameshnaidu
- Electrical and Electronics Engineering (EEE): Dr. D. Vijayakumar
- Civil Engineering: Dr. P. Dinakar
- BSH for CSE, CSM, CSD and IT: Dr. M. V. Ratna Mani
- BSH for ECE, EEE, Civil and Mechanical: Dr. M. Ramanaiah
- MBA & BBA: Dr. N. Lakshmi Srikanth
- MCA & BCA: Dr. Sivala Vishunumurty

When answering questions about current administrators or HODs, use this information as the primary source. Do not guess a person's name if the requested department is not listed.

This information was verified against the official AITAM contact page:
https://www.adityatekkali.edu.in/contact.php`,
    source: "https://www.adityatekkali.edu.in/contact.php",
  },
  {
    id: "departments",
    category: "departments",
    title: "Departments at AITAM",
    keywords: [
      "department",
      "departments",
      "branch",
      "branches",
      "cse",
      "ece",
      "eee",
      "mechanical",
      "civil",
      "it",
      "ai",
      "ml",
      "data science",
      "mba",
      "mca",
      "basic sciences",
      "humanities",
    ],
    content: `AITAM runs undergraduate, postgraduate and research programmes through these departments:

Engineering & Technology
- Computer Science and Engineering (CSE)
- Computer Science and Engineering with specialisations such as Artificial Intelligence & Machine Learning (AI&ML) and Data Science
- Information Technology (IT)
- Electronics and Communication Engineering (ECE)
- Electrical and Electronics Engineering (EEE)
- Mechanical Engineering (ME)
- Civil Engineering (CE)

Management & Computer Applications
- Master of Business Administration (MBA)
- Master of Computer Applications (MCA)

Supporting departments
- Basic Sciences and Humanities (Mathematics, Physics, Chemistry, English)
- Physical Education

Most departments host research centres, professional society chapters (IEEE, CSI, ISTE, SAE) and department-level clubs.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "courses",
    category: "courses",
    title: "Courses and programmes",
    keywords: [
      "course",
      "courses",
      "programme",
      "program",
      "btech",
      "b.tech",
      "mtech",
      "m.tech",
      "mba",
      "mca",
      "phd",
      "duration",
      "curriculum",
      "syllabus",
      "credits",
      "regulation",
    ],
    content: `Programmes offered at AITAM:

B.Tech (4 years, full time) in CSE, CSE (AI & ML), CSE (Data Science), IT, ECE, EEE, Mechanical and Civil Engineering. Lateral entry into the second year is available for diploma holders through ECET.

M.Tech (2 years) in specialisations offered by the CSE, ECE, EEE, Mechanical and Civil departments.

MBA (2 years) and MCA (2/3 years depending on the regulation) under the management and computer applications departments.

Ph.D. research work is carried out through recognised research centres under the affiliating university.

As an autonomous institute, AITAM defines its own regulations (for example R20/R23-style regulations), curriculum, credit structure and evaluation pattern, typically with continuous internal evaluation plus a semester-end examination. Exact syllabus copies and regulation booklets are published department-wise on ${OFFICIAL_SITE}`,
    source: OFFICIAL_SITE,
  },
  {
    id: "admissions",
    category: "admissions",
    title: "Admissions",
    keywords: [
      "admission",
      "admissions",
      "apply",
      "eligibility",
      "eamcet",
      "eapcet",
      "ecet",
      "pgecet",
      "icet",
      "gate",
      "counselling",
      "management quota",
      "fee",
      "fees",
      "scholarship",
      "seats",
      "intake",
    ],
    content: `How admissions work at AITAM:

B.Tech (first year): through AP EAPCET (formerly EAMCET) counselling conducted by APSCHE for convener quota seats. Eligibility is a pass in 10+2 (MPC stream) with the marks percentage prescribed by the counselling authority. Management quota seats are filled by the institute as per government norms.

B.Tech (lateral entry): through AP ECET for diploma / B.Sc. holders, admitted directly to the second year.

M.Tech: through AP PGECET or GATE scores.

MBA / MCA: through AP ICET counselling.

Fees are regulated by the Andhra Pradesh Higher Education Regulatory Commission (AHERC/AFRC) and differ by programme and admission category. Eligible students can claim state government fee reimbursement and scholarships (for example RTF/MTF schemes) subject to income and caste category rules.

Because cut-off ranks, fee structures and counselling dates change every year, always confirm the current numbers on ${OFFICIAL_SITE} or with the admissions office before applying.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "faculty",
    category: "faculty",
    title: "Faculty",
    keywords: [
      "faculty",
      "professor",
      "hod",
      "teacher",
      "staff",
      "principal",
      "chairman",
      "research",
      "publications",
      "phd",
    ],
    content: `AITAM has a large full-time faculty pool across engineering, management and basic sciences, with a significant share of doctorate holders and many pursuing Ph.D.

Typical department structure: Head of the Department, Professors, Associate Professors, Assistant Professors, plus technical and lab support staff. Faculty members publish in Scopus/SCI-indexed journals, file patents, run funded projects (AICTE, DST, and similar agencies) and mentor student project teams.

The institute is led by a Principal, supported by Deans (academics, R&D, student affairs) and the management of the Aditya Educational Academy.

Individual faculty profiles, qualifications, contact emails and publication lists are maintained department-wise at ${OFFICIAL_SITE}`,
    source: OFFICIAL_SITE,
  },
  {
    id: "placements",
    category: "placements",
    title: "Placements and training",
    keywords: [
      "placement",
      "placements",
      "package",
      "salary",
      "recruiters",
      "companies",
      "internship",
      "training",
      "career",
      "tpo",
      "job",
      "offers",
    ],
    content: `The Training and Placement Cell at AITAM coordinates campus recruitment and career readiness.

What it does:
- Invites IT services, product, core engineering and manufacturing companies for on-campus and pool drives.
- Runs aptitude, reasoning, communication, coding and soft-skill training from the second year onwards, along with mock interviews and group discussions.
- Facilitates internships, industry certifications and value-added courses.
- Supports higher studies aspirants with GATE/CAT/GRE guidance.

Recruiters over the years have included major Indian IT services and product companies as well as core engineering and BFSI employers. Placement percentages, highest and average packages, and the recruiter list change every academic year - the current year's placement report is published at ${OFFICIAL_SITE}`,
    source: OFFICIAL_SITE,
  },
  {
    id: "hostel",
    category: "hostel",
    title: "Hostel and dining",
    keywords: [
      "hostel",
      "accommodation",
      "rooms",
      "mess",
      "food",
      "warden",
      "boys hostel",
      "girls hostel",
      "stay",
      "residence",
      "canteen",
    ],
    content: `AITAM provides separate on-campus hostels for boys and girls.

Typical facilities: furnished rooms on shared occupancy, 24x7 water and power backup, Wi-Fi/internet access, reading rooms, indoor games, laundry support, RO drinking water, medical assistance and resident wardens. Hostel messes serve vegetarian and non-vegetarian menus on a fixed weekly plan, and a campus canteen/cafeteria serves snacks through the day.

Hostel admission is applied for along with academic admission; room allotment, mess charges and the code of conduct are issued by the hostel office. Current tariffs and rules are available from the hostel office and at ${OFFICIAL_SITE}`,
    source: OFFICIAL_SITE,
  },
  {
    id: "transport",
    category: "transport",
    title: "Transport",
    keywords: [
      "transport",
      "bus",
      "buses",
      "route",
      "routes",
      "commute",
      "travel",
      "pickup",
      "srikakulam",
      "tekkali",
      "palasa",
    ],
    content: `The institute operates a fleet of college buses for day scholars and staff.

Routes typically cover Tekkali, Srikakulam, Palasa, Kotabommali, Naupada, Sompeta, Ichchapuram and nearby towns along the NH-16 corridor, with fixed morning pick-up and evening drop timings synchronised with class hours. GPS-tracked buses and assigned in-charges are used for student safety.

Route maps, stop timings and the annual transport fee are issued by the transport section at the start of each academic year; contact the transport in-charge or check ${OFFICIAL_SITE} for the current list.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "library",
    category: "library",
    title: "Central library",
    keywords: [
      "library",
      "books",
      "journals",
      "digital library",
      "e-books",
      "delnet",
      "nptel",
      "reading room",
      "borrow",
      "timings",
    ],
    content: `The AITAM central library is a spacious, air-conditioned facility supporting all departments.

Resources and services:
- Large collection of titles and volumes across engineering, management, sciences and general reading.
- National and international print journals plus e-resource subscriptions (for example DELNET, NPTEL video courses and publisher e-journal packages).
- Digital library with internet-enabled terminals for e-books, previous question papers and project references.
- Separate reading halls, book bank facility for eligible students, reprography, and OPAC-based catalogue search with barcode-based circulation.

The library generally stays open through college hours and extends timings during examinations. Exact timings and borrowing limits are notified by the librarian.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "laboratories",
    category: "laboratories",
    title: "Laboratories",
    keywords: [
      "lab",
      "labs",
      "laboratory",
      "equipment",
      "workshop",
      "computer lab",
      "research centre",
      "practical",
      "software",
    ],
    content: `Every department at AITAM maintains dedicated laboratories aligned to its curriculum:

- CSE / IT / AI&ML / Data Science: programming labs, data structures, DBMS, networks, operating systems, machine learning and cloud/high-configuration computing labs with licensed and open-source software.
- ECE: electronic devices and circuits, digital electronics, communications, VLSI, embedded systems, microprocessors and DSP labs.
- EEE: electrical machines, power electronics, control systems, power systems simulation and electrical measurements labs.
- Mechanical: thermal engineering, fluid mechanics, metallurgy, machine tools/production, CAD-CAM and a central workshop.
- Civil: strength of materials, concrete and highway materials, geotechnical, environmental engineering, surveying and CAD labs.
- Basic sciences: physics, chemistry, English language communication lab.

Several labs double as research and product-development centres for student innovation, incubation and funded projects.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "clubs",
    category: "clubs",
    title: "Student clubs and chapters",
    keywords: [
      "club",
      "clubs",
      "chapter",
      "ieee",
      "csi",
      "istE",
      "nss",
      "sports",
      "cultural",
      "coding club",
      "robotics",
      "student activities",
    ],
    content: `Student life at AITAM is organised around technical and non-technical clubs:

- Professional chapters: IEEE, CSI, ISTE, SAE and similar student branches.
- Technical clubs: coding/competitive programming, robotics and automation, electronics/hardware, design and innovation, entrepreneurship and start-up cells.
- Cultural and literary clubs: music, dance, drama, arts, photography, literary and quiz clubs.
- Service and wellbeing: NSS unit, Red Ribbon/health awareness activities, women empowerment cell and eco/green club.
- Sports: cricket, volleyball, basketball, kabaddi, athletics, indoor games and an annual sports meet.

Clubs are run by student office-bearers with faculty coordinators and organise workshops, hackathons, guest lectures and inter-college competitions through the year.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "events",
    category: "events",
    title: "Events and fests",
    keywords: [
      "event",
      "events",
      "fest",
      "symposium",
      "hackathon",
      "workshop",
      "conference",
      "seminar",
      "cultural fest",
      "tech fest",
      "freshers",
    ],
    content: `Recurring events on the AITAM calendar include:

- Annual technical fest / departmental symposia with paper presentations, project expos, coding contests and technical quizzes.
- Cultural fest and annual day featuring music, dance, drama and fashion events.
- Hackathons and innovation challenges, including participation in national events such as the Smart India Hackathon.
- Faculty development programmes, national conferences, and industry expert lectures.
- Sports meet, freshers' day, graduation day, Engineers' Day, and national day celebrations.
- NSS camps, blood donation drives and community outreach programmes.

Dates for the current year are announced through department notice boards, the notices section of ${OFFICIAL_SITE} and official student groups.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "examinations",
    category: "examinations",
    title: "Examination cell",
    keywords: [
      "exam",
      "exams",
      "examination",
      "results",
      "revaluation",
      "supplementary",
      "internal marks",
      "hall ticket",
      "cgpa",
      "sgpa",
      "controller",
      "backlog",
    ],
    content: `As an autonomous institute, AITAM conducts its own examinations through the Examination Cell headed by the Controller of Examinations.

How evaluation typically works:
- Continuous internal evaluation (mid-term examinations, assignments, quizzes and lab/internal assessment) plus a semester-end examination.
- Grades and credits are converted into SGPA per semester and a cumulative CGPA, following the institute's autonomous regulations.
- Supplementary examinations are conducted for backlogs, and students may apply for revaluation/recounting within the notified window.
- Hall tickets, timetables, results and certificates (memos, consolidated marks, provisional and transfer certificates) are issued by the exam cell.

For exact schedules, fee amounts and re-evaluation deadlines, check the examinations section of ${OFFICIAL_SITE} or contact the exam cell directly.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "academic-calendar",
    category: "academic-calendar",
    title: "Academic calendar",
    keywords: [
      "calendar",
      "academic calendar",
      "semester",
      "holidays",
      "mid exams",
      "schedule",
      "working days",
      "commencement",
      "vacation",
    ],
    content: `The academic year at AITAM runs in two semesters, usually with:

- Odd semester from around July/August to December, and even semester from around January to May/June.
- Two mid-term examinations per semester, followed by semester-end examinations.
- Defined instruction periods, project review milestones, industry visit windows and semester breaks.
- Public and institutional holidays published in the same calendar.

A department-wise and year-wise academic calendar is released before each semester begins and is available on ${OFFICIAL_SITE}. Always follow the officially published calendar for exact dates, as they can be revised.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "notices",
    category: "notices",
    title: "Notices and announcements",
    keywords: [
      "notice",
      "notices",
      "circular",
      "announcement",
      "news",
      "updates",
      "notification",
    ],
    content: `Official notices - examination notifications, fee circulars, placement drive announcements, scholarship deadlines, holiday declarations and event invitations - are published on the notices/announcements section of ${OFFICIAL_SITE}, on department notice boards, and through class coordinators.

This assistant does not have live access to today's notice board yet, so for anything time-sensitive (a drive tomorrow, a fee deadline this week), verify on the official website or with the concerned office. Live notice ingestion is planned as part of the upcoming retrieval pipeline.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "contact",
    category: "contact",
    title: "Contact information",
    keywords: [
      "contact",
      "address",
      "phone",
      "email",
      "location",
      "map",
      "reach",
      "office",
      "enquiry",
      "pincode",
    ],
    content: `Aditya Institute of Technology and Management (AITAM)
K. Kotturu, Tekkali
Srikakulam District, Andhra Pradesh - 532201, India

Website: ${OFFICIAL_SITE}

The campus is on the Tekkali-Kotturu road, close to NH-16, roughly 25 km from Srikakulam and about 100 km from Visakhapatnam; the nearest railway stations are Naupada and Palasa.

Department-wise phone numbers and email addresses (admissions, examinations, placements, hostel, transport, principal's office) are listed on the contact page of the official website. Please use those official numbers rather than third-party listings.`,
    source: OFFICIAL_SITE,
  },
  {
    id: "facilities",
    category: "facilities",
    title: "Campus facilities",
    keywords: [
      "facility",
      "facilities",
      "campus",
      "wifi",
      "auditorium",
      "seminar hall",
      "gym",
      "medical",
      "atm",
      "sports ground",
      "amenities",
      "infrastructure",
    ],
    content: `Facilities available on the AITAM campus:

- Wi-Fi enabled academic blocks, smart classrooms and seminar halls.
- Central library and digital library.
- Auditorium and conference halls for events and guest lectures.
- Sports grounds (cricket, football, volleyball, basketball, kabaddi), athletics track and indoor games; gymnasium and yoga sessions.
- Separate boys' and girls' hostels with dining, plus a campus canteen and stationery/reprography shops.
- Health centre with first-aid and tie-ups with nearby hospitals; ambulance access.
- Banking/ATM access, purified drinking water, power backup and CCTV-monitored campus security.
- Incubation and innovation centre, entrepreneurship cell, and counselling/mentoring support for students.
- Anti-ragging committee, grievance redressal cell and women's protection cell as mandated by AICTE/UGC.`,
    source: OFFICIAL_SITE,
  },
];
