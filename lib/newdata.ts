// lib/data.ts — Single source of truth for all portfolio content

export const meta = {
    name: "Keanu Ely Gilbert Manly",
    firstName: "Keanu",
    title: "Full-Stack Software Engineer",
    location: "Legazpi City, Albay, Philippines",
    email: "manlykeanu@gmail.com",
    phone: "+63-927-998-5234",
    tagline: "Full-Stack Engineer. System Thinker. Production-First.",
    // heroStatement: "Software Engineer delivering scalable, production-ready systems end-to-end.",
    heroStatement: [
      { text: "I build full-stack systems that ", highlight: false },
      { text: "ship to production,", highlight: true },
      { text: " scale under load,", highlight: false },
      { text: " and ", highlight: false },
      { text: "solve real business problems.", highlight: true },
    ],
    // heroStatement:
    //   "I architect and ship production-grade full-stack systems — from API design and database modeling to cloud infrastructure and frontend delivery — that hold under real workloads and scale with business growth.",
    heroSub:
      "Six years of end-to-end ownership across call analysis platforms, distributed APIs, and cloud-native services.",
    summary: [
      "Software Engineer with six years of professional experience designing, building, and operating production web applications and APIs. Technical foundation spans the full delivery stack: React and Next.js on the frontend, Python (FastAPI) and Node.js (Express) on the backend, and containerized deployments on docker and aws services.",
      "At Boom AI Solutions, I served as both engineer and team lead — leading sprint planning, driving cross-functional delivery, and owning production issue resolution as the primary escalation point. I built and scaled a call analysis platform that processes real workloads, integrated third-party APIs at production volume, and consistently reduced system downtime through root-cause analysis and targeted optimization.",
      "I approach engineering with an architectural mindset: thinking about data flow, failure modes, and long-term maintainability before writing a line of code. Equally comfortable pairing with product managers or developers to translate ambiguous requirements into a technical plan, mentoring teammates through code review, and deploying containerized services on AWS or in docker.",
    ],
    stats: [
      { label: "Years Experience", value: "6" },
      { label: "Role", value: "Software Engineer" },
      { label: "Platforms Shipped", value: "Prod" },
      { label: "AWS Certified", value: "CCP" },
    ],
  };
  
  export const experience = [
    {
      title: "Software Engineer / Team Lead",
      company: "Boom AI Solutions OPC",
      period: "Feb 2022 – Dec 2025",
      type: "Full-time",
      highlights: [
        "Led sprint planning and cross-functional delivery, improving task distribution and sustaining consistent on-time releases.",
        "Elevated code quality and team velocity through structured code reviews, shared documentation, and collaborative testing.",
        "Built and scaled a call analysis platform with APIs and third-party integrations supporting production workloads.",
        "Owned production issue resolution as the primary escalation point, reducing downtime through fast root-cause analysis.",
        "Partnered across engineering, product, and operations to maintain high-availability, stable production systems.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Boomsourcing Inc",
      period: "Jan 2021 – Feb 2022",
      type: "Full-time",
      highlights: [
        "Executed sprint tasks within an agile framework, ensuring consistent on-time delivery aligned with product roadmaps.",
        "Built and maintained production components of a call analysis platform, including APIs and third-party integrations.",
        "Improved system performance and output accuracy through targeted optimizations and refactoring.",
        "Contributed code quality by actively participating in code reviews, testing, and technical documentation.",
        "Troubleshot and resolved production defects, performing root-cause analysis for long-term system reliability.",
      ],
    },
    {
      title: "Junior Developer",
      company: "Boomsourcing Inc",
      period: "May 2019 – Mar 2020",
      type: "Full-time",
      highlights: [
        "Completed structured frontend and backend bootcamp training covering development fundamentals and team workflows.",
        "Contributed to feature development, testing, and documentation under senior engineer guidance.",
        "Built and maintained components following clean architecture and maintainability best practices.",
        "Produced technical documentation to support onboarding and day-to-day development.",
      ],
    },
  ];
  
  export const skills = {
    Frontend: [
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Material UI",
      "Ant Design",
      "Magic UI",
      "Charts",
      "Cypress",
      "Context API",
      "Redux",
    ],
    Backend: ["Python", "FastAPI", "Node.js", "Express.js"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Amazon DynamoDB"],
    "Cloud & Infra": [
      "AWS Lambda",
      "Amazon S3",
      "Amazon Cognito",
      "Amazon IAM",
      "Amazon CloudWatch",
      "Docker",
      "Vercel",
      "Railway",
      "Netlify",
    ],
    "AI & APIs": ["GPT API", "Claude Code", "REST API Design", "Third-party Integrations"],
    "Dev Tools": ["Git", "GitHub", "GitLab", "VS Code", "Postman", "Insomnia", "Notion", "ClickUp", "Slack"],
    Architecture: [
      "RESTful API Design",
      "Async Processing Pipelines",
      "RBAC",
      "Containerization",
      // "Observability",
      "Agile / Sprint Delivery",
      // "LLM Integration Patterns",
    ],
  };

  export interface Screenshot {
    src: string;
    alt: string;
    caption?: string;
  }
  
  export interface Project {
    slug: string;
    title: string;
    tagline: string;
    tags: string[];
    period: string;
    problem: string;
    solution: string;
    screenshots?: Screenshot[];
    stack: {
      frontend: string[];
      backend: string[];
      infra: string[];
    };
    features: string[];
    challenges: { title: string; body: string }[];
    impact: string[];
    status: "live" | "production" | "archived" | "work in progress";
  }
  
  export const projects: Project[] = [
    {
      slug: "call-analysis-platform",
      title: "Call Analysis Platform",
      tagline: "AI-powered call intelligence at production scale.",
      tags: ["React", "Context API", "Material UI", "TailwindCSS", "Dialogflow API", "Python", "FastAPI", "AWS", "Docker"],
      period: "2021 – 2025",
      screenshots: [
        {
          src: "/screenshots/call-analysis/metrics.png",
          alt: "Call analysis dashboard showing campaign performance metrics",
          caption: "Dashboard — Campaign performance overview",
        },
        {
          src: "/screenshots/call-analysis/campaign.png",
          alt: "Call analysis dashboard showing campaign list",
          caption: "Dashboard — Campaign list overview",
        },
        {
          src: "/screenshots/call-analysis/script_editor.png",
          alt: "Campaign scripting workflow configuration",
          caption: "Dashboard — Campaign configuration overview",
        },
        // {
        //   src: "/screenshots/call-analysis/sperocrm_1.png",
        //   alt: "Portal Management showing pools number of campaign",
        //   caption: "Dashboard — Portal Management overview",
        // },
        // {
        //   src: "/screenshots/call-analysis/sperocrm_2.png",
        //   alt: "Boom Flow Agent List of intent and configuration and console",
        //   caption: "Dashboard — Boom Flow overview",
        // },
        // {
        //   src: "/screenshots/call-analysis/dashboard.png",
        //   alt: "Call analysis dashboard showing agent performance metrics",
        //   caption: "Dashboard — Agent performance overview",
        // },
        // {
        //   src: "/screenshots/call-analysis/call-detail.png",
        //   alt: "Individual call detail view with AI-generated transcript and scoring",
        //   caption: "Call Detail — AI transcript & scoring",
        // },
        // {
        //   src: "/screenshots/call-analysis/analytics.png",
        //   alt: "Analytics view showing call volume trends and quality scores",
        //   caption: "Analytics — Volume trends & quality scores",
        // },
        // {
        //   src: "/screenshots/call-analysis/admin.png",
        //   alt: "Admin panel for managing users and configuring analysis parameters",
        //   caption: "Admin — User management & config",
        // },
      ],
      problem:
        "Customer-facing call center operations generate high volumes of audio interaction data with no scalable mechanism for automated quality analysis, agent performance tracking, or business-level insight extraction. Manual review does not scale.",
      solution:
        "Designed and built a call analysis platform integrating third-party speech and AI APIs into a backend pipeline capable of processing, analyzing, and surfacing structured insight from raw call data. The system was architected for production reliability: async processing, structured error handling, and observable infrastructure from day one.",
      stack: {
        frontend: ["React", "TailwindCSS", "Material UI", "Bootstrapped", "Cypress", "Charts", "Context API", "Redux"],
        backend: ["Python", "FastAPI", "Node.js", "Express.js", "Redis", "AWS", "Gitlab API", "Dialogflow API", "Deepgram"],
        infra: ["AWS Lambda", "DynamoDB", "S3", "Cognito", "IAM", "CloudWatch", "Docker"],
      },
      features: [
        "Automated ingestion and processing pipeline for call recordings",
        // "AI-powered call analysis via GPT API integration",
        "Role-based access control using Amazon Cognito and IAM",
        "Real-time observability with CloudWatch metrics and alerting",
        "RESTful API layer supporting third-party integrations",
        "Campaign dashboard for performance metrics and Quality Assurance",
        "Script Editor for tailoring and generating voices and scripts",
        "Admin dashboard for performance metrics and reporting",
        "Campaign dashboard for campaign list and campaign creation",
      ],
      challenges: [
        {
          title: "Reliability at scale",
          body:
            "Call analysis pipelines involve variable-length async jobs. Early implementations had brittle error handling that caused silent failures under load. Resolved by introducing structured retry logic, dead-letter handling, and CloudWatch-based alerting on failure thresholds.",
        },
        // {
        //   title: "AI output consistency",
        //   body:
        //     "GPT API responses required post-processing normalization to produce structured, queryable output. Implemented a validation and transformation layer between the AI response and the data persistence layer, decoupling AI behavior from business logic.",
        // },
        {
          title: "Data accuracy and consistency",
          body:
            `Ensuring accurate KPIs in a real-time call analysis platform was challenging due to timezone differences and asynchronous, multi-stage processing. I learned that without strict timestamp normalization, clear aggregation rules, and idempotent processing, dashboards become unreliable. Enforcing CST standards and reconciliation checks was key to maintaining stakeholder trust in the data.`,
        },
        {
          title: "Maintaning and tailoring script and generating voices",
          body:
            "A major challenge was maintaining campaign-specific scripts and AI voice cloning without breaking downstream processing. Since scripts were stored in structured JSON and version-controlled, even small updates could disrupt voice generation. I learned to implement strict validation, version tracking, and fault-tolerant processing to ensure production stability.",
        },
      ],
      impact: [
        "Sustained production workload processing across platform lifecycle",
        "Reduced production downtime as primary escalation point for incident resolution",
        "Improved team delivery velocity through sprint structure and code review cadence",
        "Increased output accuracy through targeted refactoring and optimization cycles",
      ],
      status: "production",
    },
    {
      slug: "personal-portfolio",
      title: "Personal Portfolio",
      tagline: "Building Production-Ready Software.",
      tags: ["React", "NextJS", "TailwindCSS", "TypeScript", "Javascript"],
      period: "2025 – Present",
      screenshots: [
        // {
        //   src: "/screenshots/call-analysis/admin.png",
        //   alt: "Admin panel for managing users and configuring analysis parameters",
        //   caption: "Admin — User management & config",
        // },
      ],
      problem:
        "In the tech industry, where building digital products is the core of the profession, not having a personal brand or portfolio can work against you. Without visible projects or proof of work, it may appear that you’re not continuously improving your skills, and it reduces your chances of effectively presenting your expertise to potential clients or hiring teams.",
      solution:
        "The solution is to create a visible, professional presence by building a portfolio, sharing case studies, and developing small but meaningful side projects. Even without exposing confidential work, you can highlight your role, technical decisions, and measurable impact to demonstrate continuous growth and real-world experience.",
      stack: {
        frontend: ["React", "TailwindCSS", "NextJS", "TypeScript", "Javascript"],
        backend: ["N/A"],
        infra: ["Github", "Vercel"],
      },
      features: [
        "Showcasing featured projects with detailed case studies",
        "Highlighting technical capabilities and engineering strengths",
        "Presenting structured tech stack expertise (Frontend, Backend, Infrastructure)",
        "Demonstrating real-world problem solving and system design thinking",
        "Optimized performance and responsive design",
        "Integrated contact and professional links for opportunities"
      ],
      challenges: [
        {
          title: "Detailed Design and Conceptualization",
          body: "Translating abstract ideas into a structured, production-ready portfolio required careful planning of layout, content hierarchy, and user experience. It reinforced the importance of clarity, intentional design, and aligning presentation with professional goals."
        }
      ],
      impact: [
        "Increases visibility to potential employers and clients",
        "Provides concrete proof of technical capability and real-world execution",
        "Demonstrates continuous learning and professional growth",
        "Strengthens professional credibility in the industry"
      ],
      status: "live",
    },
  ];
  
  export const education = {
    degree: "Bachelor of Information Technology",
    school: "Forbes College",
    location: "Legazpi City, Philippines",
    period: "2014 – 2018",
    certifications: ["AWS Cloud Practitioner", "Boomcamp Training — Frontend & Backend"],
    languages: ["English", "Tagalog"],
  };