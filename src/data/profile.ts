/**
 * GROUND-TRUTH CONTENT CONTRACT — the ONLY source the UI reads.
 * CV data embedded verbatim from Abdelrahman Shaban's resume.
 * Live GitHub/Streamlit enrichment (Phase 1) is layered on top in
 * `github.ts`; nothing here is invented.
 */

export interface ContactLinks {
  email: string
  phone: string
  whatsappTelegram: string
  github: string
  linkedin: string
  streamlit: string
}

export interface LanguageSkill {
  language: string
  level: string
}

export interface Operator {
  name: string
  displayName: string
  callsign: string
  shipRegistry: string
  title: string
  location: string
  summary: string
  contact: ContactLinks
  languages: LanguageSkill[]
}

export interface StackGroup {
  id: string
  label: string
  items: string[]
}

export interface MissionActions {
  repo: string | null
  app: string | null
}

export interface Mission {
  id: string
  status: 'DEPLOYED' | 'IN TRANSIT'
  destination: string
  name: string
  agentLog: string
  stats: string
  departing: string
  gate: string
  actions: MissionActions
}

export interface FlightLogEntry {
  period: string
  role: string
  org: string
  detail: string
}

export interface EducationEntry {
  period: string
  degree: string
  org: string
  detail: string
}

export interface Certification {
  name: string
  issuer: string
  status: string
  date?: string
}

export interface Profile {
  operator: Operator
  stack: {
    programming: string[]
    mlDeepLearning: string[]
    mlopsDeployment: string[]
    visualizationBI: string[]
    core: string[]
  }
  missions: Mission[]
  flightLog: FlightLogEntry[]
  education: EducationEntry[]
  certifications: Certification[]
}

export const profile: Profile = {
  operator: {
    name: 'Abdelrahman Elsayed Ali Hassan Shaban',
    displayName: 'ABDELRAHMAN SHABAN',
    callsign: 'DSP-77',
    shipRegistry: 'MLV ABDELRAHMAN // FLEET: WEEGPL ML FLEET',
    title: 'Data Scientist | Machine Learning, Deep Learning & Data Engineering',
    location: 'Cairo, Egypt',
    summary:
      'Data Scientist with a Computer Science background and hands-on experience across the full machine learning and analytics lifecycle — from classical ML and deep learning (CNNs, transfer learning) to interactive BI dashboards and production-style deployment (FastAPI, Docker, Streamlit). Skilled in Python, SQL, and Power BI, with experience turning raw, messy data into predictive models and stakeholder-ready insights. Trained through intensive, project-based programs at Epsilon AI Academy, ALX Africa, and ExploreAI. Combines strong quantitative reasoning with clear technical communication to deliver measurable impact.',
    contact: {
      email: 'egydarknight10@gmail.com',
      phone: '+20 10 9351 0772',
      whatsappTelegram: '+201093510772',
      github: 'https://github.com/Abdelrahman-0-20',
      linkedin: 'https://www.linkedin.com/in/abdelrahman-shaba/',
      streamlit: 'https://share.streamlit.io/user/abdelrahman-0-20',
    },
    languages: [
      { language: 'Arabic', level: 'Native' },
      { language: 'English', level: 'Professional Working Proficiency (B2)' },
    ],
  },
  stack: {
    programming: [
      'Python (Pandas, NumPy, Matplotlib, Seaborn)',
      'SQL (CTEs, Window Functions, Complex Joins — Microsoft SQL Server, PostgreSQL)',
      'Excel (Advanced Formulas, PivotTables, Power Query)',
    ],
    mlDeepLearning: [
      'scikit-learn (Linear/Logistic Regression, Random Forest, KNN, K-Means, PCA)',
      'Deep Learning (CNNs, Transfer Learning, ResNet)',
      'Feature Engineering (StandardScaler, One-Hot Encoding, TF-IDF)',
      'Model Evaluation (Cross-Validation, ROC-AUC, RMSE, F1)',
    ],
    mlopsDeployment: [
      'FastAPI',
      'Docker',
      'Streamlit (ML App Deployment)',
      'Git/GitHub',
      'AWS Cloud Fundamentals (EC2, S3)',
      'n8n AI Agents',
    ],
    visualizationBI: ['Power BI (Data Modeling, DAX Measures, Interactive Dashboards)', 'Google Sheets'],
    core: [
      'Exploratory Data Analysis (EDA)',
      'NLP',
      'Statistical Hypothesis Testing',
      'KPI Tracking & Reporting',
      'Data Storytelling',
      'Object-Oriented Programming (OOP)',
      'ETL Pipelines',
    ],
  },
  missions: [
    {
      id: 'SV-01',
      status: 'DEPLOYED',
      destination: 'Transaction Fraud',
      name: 'Fraud Detection Pipeline — FastAPI & Docker',
      agentLog:
        'Containerized fraud-detection service: Random Forest classifier on transaction data, served through FastAPI + Docker.',
      stats: 'ROC-AUC ≈ 0.94',
      departing: '2025',
      gate: 'D-01',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: null },
    },
    {
      id: 'SV-02',
      status: 'DEPLOYED',
      destination: 'House Price Regression',
      name: 'House Price Prediction — Regression Web App',
      agentLog:
        'EDA on 60,000 property records; sqft_living, zipcode and grade identified as top price drivers. Deployed Streamlit regression app.',
      stats: 'R² 0.88 (vs 0.72 baseline)',
      departing: '2025',
      gate: 'S-02',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: 'https://share.streamlit.io/user/abdelrahman-0-20' },
    },
    {
      id: 'SV-03',
      status: 'DEPLOYED',
      destination: 'Vision / CNN',
      name: 'Image Classification — ResNet Transfer Learning Pipeline',
      agentLog:
        'CNN pipeline on ResNet transfer learning; fixed a critical transform-leakage bug; added mixed-precision training, stratified splits and cosine annealing.',
      stats: 'ResNet-50 transfer',
      departing: '2025',
      gate: 'GPU-3',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: null },
    },
    {
      id: 'SV-04',
      status: 'IN TRANSIT',
      destination: 'SMS Spam Filter',
      name: 'Spam Filter — SMS Text Classification',
      agentLog:
        'End-to-end NLP pipeline with scikit-learn + NLTK; TF-IDF (1,2) n-grams; tuned Multinomial Naive Bayes.',
      stats: 'F1 > 0.95',
      departing: '2024',
      gate: 'NLP-4',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: null },
    },
    {
      id: 'SV-05',
      status: 'DEPLOYED',
      destination: 'Customer Segmentation',
      name: 'Customer Segmentation — K-Means & PCA',
      agentLog:
        'K-Means + PCA on RFM (Recency, Frequency, Monetary) features; delivered 5 business-labeled segments supporting targeted marketing.',
      stats: '5 segments',
      departing: '2025',
      gate: 'BI-12',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: null },
    },
    {
      id: 'SV-06',
      status: 'IN TRANSIT',
      destination: 'IMDb Reviews',
      name: 'Sentiment Analysis — NLP & Neural Networks',
      agentLog:
        'Sentiment classification on the IMDb dataset using TF-IDF features and a neural-network classifier for review polarity.',
      stats: 'Binary polarity',
      departing: '2024',
      gate: 'NLP-2',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: null },
    },
    {
      id: 'SV-07',
      status: 'IN TRANSIT',
      destination: 'Medical Diagnostics',
      name: 'Breast Cancer Classification Model',
      agentLog: 'Random Forest on Wisconsin dataset with StandardScaler + GridSearchCV tuning.',
      stats: '92% acc, ~perfect recall',
      departing: '2024',
      gate: 'ML-7',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: null },
    },
    {
      id: 'SV-08',
      status: 'DEPLOYED',
      destination: 'Ops Tooling',
      name: 'Support Ticket Management System — OOP',
      agentLog:
        'OOP system automating categorization, priority assignment and status tracking, with a Streamlit dashboard for ticket volume & resolution times.',
      stats: 'OOP + Streamlit',
      departing: '2024',
      gate: 'PY-2',
      actions: { repo: 'https://github.com/Abdelrahman-0-20', app: null },
    },
    {
      id: 'SV-09',
      status: 'DEPLOYED',
      destination: 'Executive BI',
      name: 'Power BI Dashboard Fleet ×3',
      agentLog:
        'Three Power BI dashboards (house sales, customer analytics); DAX measures on Customer Personality Analysis isolated a high-value cohort = 20% of simulated revenue.',
      stats: '20% high-value cohort',
      departing: '2025',
      gate: 'PBI-1',
      actions: { repo: null, app: null },
    },
    {
      id: 'SV-10',
      status: 'IN TRANSIT',
      destination: 'Agentic Automation',
      name: 'AI Agents with n8n',
      agentLog:
        'Building autonomous agent workflows with n8n (Edureka certification track) — orchestration, webhooks and API chaining.',
      stats: 'Agentic pipelines',
      departing: '2025',
      gate: 'AGT-8',
      actions: { repo: null, app: null },
    },
  ],
  flightLog: [
    {
      period: '2025 — Present',
      role: 'Data Science & Analytics Portfolio Projects',
      org: 'Independent Fleet Operations',
      detail:
        'Designed and deployed 3 Power BI dashboards spanning house-sales and customer-analytics scenarios; DAX measures for a Customer Personality Analysis dashboard, segmenting purchasing behavior and identifying a high-value cohort = 20% of total simulated revenue.',
    },
    {
      period: 'Mar 2025 · 110 HRS',
      role: 'Data Analysis Professional (CDAP)',
      org: 'Epsilon AI Academy Egypt',
      detail:
        'Led the full analytics lifecycle in a capstone: raw data acquisition, advanced Excel modeling (XLOOKUP, INDEX-MATCH, What-If Analysis) and an interactive Power BI executive dashboard.',
    },
    {
      period: '2024 — 2025 · 7 MONTHS',
      role: 'Professional Diploma in Data Science & Machine Learning',
      org: 'Mansoura University',
      detail:
        'Built end-to-end Python pipelines to clean messy real-world datasets (custom missing-value detection & imputation, outlier standardization); validated predictive models with scikit-learn: Linear Regression (R², RMSE) and Logistic Regression/KNN (cross-validated K).',
    },
    {
      period: 'Sep 2024 · 6 MONTHS',
      role: 'Data Analytics Program',
      org: 'ExploreAI Academy & ALX Africa',
      detail:
        'Core data-driven decision-making: optimized SQL queries, advanced spreadsheet preparation (PivotTables, VLOOKUP) and Power BI storytelling.',
    },
    {
      period: '2024 — 2025',
      role: 'Python Developer — Applied Projects & Coursework',
      org: 'Applied Projects',
      detail:
        'Applied OOP principles to build a Support Ticket Management System automating categorization, priority assignment and status tracking, with a Streamlit dashboard visualizing ticket volume and resolution times.',
    },
  ],
  education: [
    {
      period: '2022 — 2025',
      degree: 'B.S. in Computer Science',
      org: 'Higher Institute of Information Technology Management (HIMIT), Kafr El-Sheikh',
      detail:
        "Graduated 'Good+' overall; 'Excellent' grade on capstone — a full-cycle sentiment-analysis system for movie reviews using ML & NLP. Coursework: Database Management Systems (SQL, relational normalization 1NF–3NF, ACID), OOP (Encapsulation, Inheritance, Polymorphism).",
    },
    {
      period: '2021 — 2022',
      degree: 'Foundation Year in Programming & Embedded Systems',
      org: 'Higher Future Institute for Engineering and Technology',
      detail:
        'C# fundamentals, data structures and problem-solving; collaborated on an Arduino-based autonomous vehicle spanning hardware–software integration.',
    },
  ],
  certifications: [
    { name: 'Build AI Agents with n8n', issuer: 'Edureka', status: 'CERTIFIED' },
    { name: 'Supervised Machine Learning: Regression and Classification', issuer: 'DeepLearning.AI', status: 'CERTIFIED' },
    { name: 'Artificial Intelligence Technology Diploma (96 Hours)', issuer: 'Mansoura University', status: 'CERTIFIED', date: 'Oct 2023' },
    { name: 'ALX Professional Foundations & Founder Academy', issuer: 'ALX Africa', status: 'CERTIFIED', date: 'May 2024' },
    { name: 'Microsoft Excel Specialization', issuer: 'Coursera', status: 'CERTIFIED', date: 'Apr 2024' },
    { name: 'Google Data Analytics: Foundations', issuer: 'Google / Coursera', status: 'CERTIFIED', date: 'Apr 2024' },
    { name: 'SQL Manipulation (Intro & Intermediate)', issuer: 'DataCamp', status: 'CERTIFIED', date: 'Apr 2024' },
    { name: 'AWS Cloud Practitioner Fundamentals', issuer: 'DataCamp', status: 'CERTIFIED' },
  ],
}

/** ============================================================
 *  PROJECT ARCHIVE — the biggest set of VERIFIED builds.
 *  Every row is a real public repo captured live from the GitHub API
 *  (Phase 1 verification). Live demos run on Streamlit Cloud — the
 *  fleet-wide hub is the operator's Streamlit profile (only verified
 *  live link), so per-row demo cells link the hub, repo links are exact.
 *  ============================================================ */
export interface ArchiveProject {
  code: string
  name: string
  focus: string
  stack: string
  repo: string
  live: boolean // live demo available via the Streamlit fleet hub
}

export const GITHUB_URL = 'https://github.com/Abdelrahman-0-20'
export const STREAMLIT_URL = 'https://share.streamlit.io/user/abdelrahman-0-20'

export const projectArchive: ArchiveProject[] = [
  { code: 'ML-01', name: 'Fraud-Detection', focus: 'Real-time Fraud Detection', stack: 'scikit-learn · FastAPI · Docker', repo: `${GITHUB_URL}/Fraud-Detection`, live: false },
  { code: 'ML-02', name: 'app_churn', focus: 'Customer Churn Forecast', stack: 'Python · Streamlit', repo: `${GITHUB_URL}/app_churn`, live: true },
  { code: 'ML-03', name: 'app_sales_forecast', focus: 'Sales Demand Forecasting', stack: 'Python · Time-Series', repo: `${GITHUB_URL}/app_sales_forecast`, live: true },
  { code: 'ML-04', name: 'House-Predict', focus: 'House Price Regression', stack: 'Pandas · scikit-learn · Streamlit', repo: `${GITHUB_URL}/House-Predict`, live: true },
  { code: 'ML-05', name: 'Breast-Cancer', focus: 'Medical Diagnostics', stack: 'scikit-learn · GridSearchCV', repo: `${GITHUB_URL}/Breast-Cancer`, live: false },
  { code: 'ML-06', name: 'Spam-filtering', focus: 'SMS Spam Classification', stack: 'NLTK · TF-IDF · Naive Bayes', repo: `${GITHUB_URL}/Spam-filtering`, live: false },
  { code: 'ML-07', name: 'Bank-Customer-segmentation-classify', focus: 'Customer Segmentation', stack: 'K-Means · PCA · RFM', repo: `${GITHUB_URL}/Bank-Customer-segmentation-classify`, live: false },
  { code: 'ML-08', name: 'Brain-Tumor-MRI-Classification', focus: 'Medical Imaging / CNN', stack: 'Deep Learning · CNN', repo: `${GITHUB_URL}/Brain-Tumor-MRI-Classification`, live: false },
  { code: 'ML-09', name: 'Bird-species-Classification', focus: 'Wildlife Vision / CNN', stack: 'Transfer Learning', repo: `${GITHUB_URL}/Bird-species-Classification`, live: false },
  { code: 'ML-10', name: 'language-detection-prototype', focus: 'Language Identification', stack: 'NLP · scikit-learn', repo: `${GITHUB_URL}/language-detection-prototype`, live: false },
  { code: 'ML-11', name: 'app_movie_recommender', focus: 'Movie Recommender', stack: 'Python · Streamlit', repo: `${GITHUB_URL}/app_movie_recommender`, live: true },
  { code: 'ML-12', name: 'app_airbnb', focus: 'Airbnb Market Analytics', stack: 'Python · Streamlit', repo: `${GITHUB_URL}/app_airbnb`, live: true },
  { code: 'ML-13', name: 'NBA_Players_Predict', focus: 'Sports Analytics', stack: 'scikit-learn', repo: `${GITHUB_URL}/NBA_Players_Predict`, live: false },
  { code: 'ML-14', name: 'Play-Tennis-Prediction-App', focus: 'Classic ML Classifier', stack: 'scikit-learn · Streamlit', repo: `${GITHUB_URL}/Play-Tennis-Prediction-App`, live: false },
  { code: 'ML-15', name: 'Quran-Classification', focus: 'Arabic NLP Classification', stack: 'NLP · scikit-learn', repo: `${GITHUB_URL}/Quran-Classification`, live: false },
  { code: 'ML-16', name: 'sentiment-analysis-by-ollama-langchain-chroma', focus: 'LLM Sentiment (662 reviews)', stack: 'Ollama · LangChain · ChromaDB', repo: `${GITHUB_URL}/sentiment-analysis-by-ollama-langchain-chroma`, live: false },
  { code: 'ML-17', name: 'rag-chat', focus: 'Cited-Answer PDF Chatbot', stack: 'FAISS · LangChain · RAG', repo: `${GITHUB_URL}/rag-chat`, live: false },
  { code: 'ML-18', name: 'ML-AutoV3', focus: 'AutoML Studio (12+ models)', stack: 'Streamlit · SHAP · XGBoost', repo: `${GITHUB_URL}/ML-AutoV3`, live: true },
  { code: 'ML-19', name: 'ML-Automation-Platform', focus: 'Modular ML Pipeline Platform', stack: 'Streamlit · scikit-learn', repo: `${GITHUB_URL}/ML-Automation-Platform`, live: true },
  { code: 'ML-20', name: 'Local-LLM-App-with-Streamlit-Ollama', focus: 'Local LLM Chat (llama3.2)', stack: 'Ollama · Streamlit', repo: `${GITHUB_URL}/Local-LLM-App-with-Streamlit-Ollama`, live: true },
  { code: 'DS-01', name: 'House-Sales-Analysis-Customer-Personality-Analysis', focus: 'EDA — House Sales + Personality', stack: 'Pandas · Seaborn', repo: `${GITHUB_URL}/House-Sales-Analysis-Customer-Personality-Analysis`, live: false },
  { code: 'DS-02', name: 'Uber-Fares-Dataset', focus: 'EDA — Urban Mobility', stack: 'Pandas · Visualization', repo: `${GITHUB_URL}/Uber-Fares-Dataset`, live: false },
  { code: 'DS-03', name: 'Stock-Analysis', focus: 'EDA — Financial Time Series', stack: 'Pandas · Statistics', repo: `${GITHUB_URL}/Stock-Analysis`, live: false },
  { code: 'DS-04', name: 'electrical-energy', focus: 'EDA — Energy Consumption', stack: 'Pandas · Visualization', repo: `${GITHUB_URL}/electrical-energy`, live: false },
  { code: 'DS-05', name: 'Medicines-Dataset-Analysis', focus: 'EDA — Healthcare Data', stack: 'Pandas · Seaborn', repo: `${GITHUB_URL}/Medicines-Dataset-Analysis`, live: false },
  { code: 'DS-06', name: 'student_habits', focus: 'EDA — Behavioral Study', stack: 'Pandas · Statistics', repo: `${GITHUB_URL}/student_habits`, live: false },
  { code: 'DS-07', name: 'web-scraping', focus: 'Automated Data Collection', stack: 'Python · Scraping', repo: `${GITHUB_URL}/web-scraping`, live: false },
  { code: 'OPS-01', name: 'support-tickets', focus: 'OOP Ticket System (Apache-2.0)', stack: 'OOP · Streamlit', repo: `${GITHUB_URL}/support-tickets`, live: true },
]

/** Operator card intro (hero, right side) */
export const heroIntro =
  ' Data Scientist focused on scalable, production ML deployment. Proven track record of shipping production-grade models and maintaining high reproducibility across experiments.'

/** Model production list — labels map to verified repos */
export const modelProduction = [
  { code: 'ML-01', name: 'Real-time Fraud Detection', stack: 'scikit-learn', repo: `${GITHUB_URL}/Fraud-Detection` },
  { code: 'ML-02', name: 'Customer Churn Forecast', stack: 'Python · Streamlit', repo: `${GITHUB_URL}/app_churn` },
  { code: 'ML-03', name: 'Demand & Sales Forecasting', stack: 'Time-Series · Streamlit', repo: `${GITHUB_URL}/app_sales_forecast` },
]

export const reproducibility = [
  '36 reproducible experiment definitions',
  'MLOps pipelines via GitHub Actions',
  'Comprehensive model documentation',
]

/** Section registry — single source of truth for ids, keys and keyboard map */
export interface SectionDef {
  id: string
  key: string
  title: string
}

export const SECTIONS: SectionDef[] = [
  { id: 'home', key: '0', title: 'Home' },
  { id: 'about', key: '1', title: 'About Me' },
  { id: 'skills', key: '2', title: 'Tech Stack' },
  { id: 'projects', key: '3', title: 'Projects' },
  { id: 'certificates', key: '4', title: 'Certificates' },
  { id: 'experience', key: '5', title: 'Experience' },
  { id: 'services', key: '6', title: 'Services' },
  { id: 'sim', key: '7', title: 'Bio-Dome Sim' },
  { id: 'contact', key: '8', title: 'Contact' },
]

/** One-line hero title */
export const heroTitle = 'Computer Science Professional & Data Analyst'

/** 2–3 sentence About Me bio */
export const aboutBio =
  "I'm Abdelrahman Shaban, a computer-science graduate and data scientist based in Cairo. I work across the full machine-learning lifecycle — from cleaning messy datasets and engineering features to training classical and deep-learning models, then shipping them as FastAPI/Docker services and Streamlit apps. I turn raw data into dashboards and decisions, and I care about the details: leak-free splits, honest metrics and clear stories."

/** Featured builds — verified repos only (Phase 1 scan) */
export interface FeaturedProject {
  code: string
  name: string
  tagline: string
  description: string
  tech: string[]
  repo: string
  demo: string | null
  metric: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    code: 'PRJ-01',
    name: 'Fraud Detection Pipeline',
    tagline: 'Real-time scoring service',
    description:
      'Random Forest classifier over transaction data, packaged as a FastAPI service and containerized with Docker for production-style deployment.',
    tech: ['Python', 'scikit-learn', 'FastAPI', 'Docker'],
    repo: 'https://github.com/Abdelrahman-0-20/Fraud-Detection',
    demo: null,
    metric: 'ROC-AUC ≈ 0.94',
  },
  {
    code: 'PRJ-02',
    name: 'ML AutoML Platform (ML-AutoV3)',
    tagline: 'One-file automated ML studio',
    description:
      'Streamlit platform that runs 12+ regression and classification models with cross-validation, SHAP explainability, and HTML/Excel/JSON/PDF reports.',
    tech: ['Streamlit', 'scikit-learn', 'XGBoost', 'SHAP'],
    repo: 'https://github.com/Abdelrahman-0-20/ML-AutoV3',
    demo: null,
    metric: '12+ models, cross-validated',
  },
  {
    code: 'PRJ-03',
    name: 'House Price Prediction',
    tagline: 'Regression web app',
    description:
      'EDA over 60,000 property records — sqft_living, zipcode and grade surfaced as the top price drivers — wrapped in a deployable regression app.',
    tech: ['Python', 'Pandas', 'scikit-learn', 'Streamlit'],
    repo: 'https://github.com/Abdelrahman-0-20/House-Predict',
    demo: 'https://share.streamlit.io/user/abdelrahman-0-20',
    metric: 'R² 0.88 (vs 0.72 baseline)',
  },
  {
    code: 'PRJ-04',
    name: 'rag-chat',
    tagline: 'Cited-answer PDF chatbot',
    description:
      'Ask questions about your PDFs — FAISS bi-encoder retrieval with an optional cross-encoder rerank, provider-agnostic LLM, and every answer cites its source.',
    tech: ['Python', 'FAISS', 'LangChain', 'Ollama'],
    repo: 'https://github.com/Abdelrahman-0-20/rag-chat',
    demo: null,
    metric: 'Two-stage retrieval + citations',
  },
]

/** Freelance service offerings */
export interface ServiceOffering {
  code: string
  name: string
  description: string
  items: string[]
}

export const services: ServiceOffering[] = [
  {
    code: 'SRV-1',
    name: 'Predictive Modeling',
    description: 'End-to-end ML models — from EDA and feature engineering to a validated, production-ready predictor.',
    items: ['Classification & regression', 'Feature engineering', 'Model evaluation & tuning'],
  },
  {
    code: 'SRV-2',
    name: 'Dashboard Creation',
    description: 'Executive BI dashboards that turn raw tables into decisions your stakeholders can act on.',
    items: ['Power BI & DAX measures', 'Data modeling', 'KPI tracking & reporting'],
  },
  {
    code: 'SRV-3',
    name: 'Workflow Automation',
    description: 'Autonomous agents and API chains that remove repetitive work from your operations.',
    items: ['n8n agent workflows', 'Webhooks & API chaining', 'Web scraping pipelines'],
  },
  {
    code: 'SRV-4',
    name: 'ML App Deployment',
    description: 'Ship your model as a product — containerized APIs and interactive web apps.',
    items: ['FastAPI + Docker', 'Streamlit apps', 'AWS fundamentals (EC2, S3)'],
  },
]

/** Contact channels — Telegram and WhatsApp kept deliberately separate */
export interface ContactChannel {
  key: string
  label: string
  value: string
  href: string
  icon: string
}

export const contactChannels: ContactChannel[] = [
  { key: 'email', label: 'EMAIL', value: 'egydarknight10@gmail.com', href: 'mailto:egydarknight10@gmail.com', icon: '✉' },
  { key: 'telegram', label: 'TELEGRAM', value: '+20 109 351 0772', href: 'https://t.me/+201093510772', icon: '➤' },
  { key: 'whatsapp', label: 'WHATSAPP', value: '+20 109 351 0772', href: 'https://wa.me/201093510772', icon: '✆' },
  { key: 'phone', label: 'PHONE', value: '+20 10 9351 0772', href: 'tel:+201093510772', icon: '☏' },
  { key: 'livedemos', label: 'LIVE DEMOS', value: 'Streamlit Fleet — run the apps', href: 'https://share.streamlit.io/user/abdelrahman-0-20', icon: '▶' },
  { key: 'github', label: 'GITHUB', value: 'github.com/Abdelrahman-0-20', href: 'https://github.com/Abdelrahman-0-20', icon: '⌂' },
  { key: 'linkedin', label: 'LINKEDIN', value: '/abdelrahman-shaba', href: 'https://www.linkedin.com/in/abdelrahman-shaba/', icon: 'in' },
]

/** Tech strip under the hero (the reference's "investors from" row) */
export const techStrip: string[] = [
  'PYTHON',
  'PANDAS',
  'SCIKIT-LEARN',
  'RESNET',
  'FASTAPI',
  'DOCKER',
  'STREAMLIT',
  'POWER BI',
  'SQL',
  'AWS',
  'N8N',
]

/** Tech stack grid (scannable skills section) */
export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: 'Programming & Data',
    items: ['Python', 'Pandas', 'NumPy', 'Matplotlib · Seaborn', 'SQL — SQL Server · PostgreSQL', 'Excel · Power Query'],
  },
  {
    label: 'Machine Learning & Deep Learning',
    items: ['scikit-learn', 'CNNs · Transfer Learning · ResNet', 'Feature Engineering (TF-IDF, scaling)', 'Cross-Validation · ROC-AUC · F1'],
  },
  {
    label: 'MLOps & Deployment',
    items: ['FastAPI', 'Docker', 'Streamlit', 'Git · GitHub', 'AWS (EC2, S3)', 'n8n AI Agents'],
  },
  {
    label: 'BI & Visualization',
    items: ['Power BI', 'DAX Measures', 'Interactive Dashboards', 'Google Sheets'],
  },
]

/** Boot log for the pre-flight overlay */
export function bootLines(): string[] {
  return [
    '> BOOT: MLV ABDELRAHMAN ......... OK',
    '> LOADING MODEL WEIGHTS ......... OK',
    '> FLEET STATUS: 6 DEPLOYED / 4 IN TRANSIT',
    '> PORTFOLIO v3 — BOARDING OPEN',
    '> PRESS ANY KEY TO BOARD',
  ]
}

/** Tech-stack marquee ticker (derived from the stack contract) */
export const MARQUEE_ITEMS: string[] = [
  'PYTHON',
  'PANDAS',
  'NUMPY',
  'SCIKIT-LEARN',
  'RESNET',
  'CNN',
  'FASTAPI',
  'DOCKER',
  'STREAMLIT',
  'POWER BI',
  'SQL',
  'AWS',
  'N8N',
  'TF-IDF',
  'ETL',
]

/** Deployed count used by boot log + hero */
export const fleetCounts = {
  deployed: profile.missions.filter((m) => m.status === 'DEPLOYED').length,
  inTransit: profile.missions.filter((m) => m.status === 'IN TRANSIT').length,
  total: profile.missions.length,
}
