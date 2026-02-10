// ============================================
// PERSONAL INFORMATION CONFIGURATION
// ============================================
// Update all your personal details here in one place
// This file is the single source of truth for all personal data across the website

export const personalData = {
  // Basic Information
  name: "Harsh Sharma",
  title: "Software Engineer",
  tagline: "Building scalable systems with clean code",
  location: "New Delhi, India",

  // Contact Information
  contact: {
    email: "iamharshpanotra@gmail.com",
    // phone: "+91 60065 9***6", 
  },

  // Social Links
  social: {
    github: "https://github.com/iamharshpanotra",
    linkedin: "https://linkedin.com/in/iamharshpanotra",
    twitter: "https://twitter.com/iamharshpanotra",
    leetcode: "https://leetcode.com/iamharshpanotra",
    portfolio: "https://yourwebsite.com",
  },

  // Resume/CV Link
  resume: "https://drive.google.com/file/d/1RHDPjPVgoEcbS7O54jEFg78fMwWUHd5V/view?usp=sharing",

  // About Section
  about: {
    // Short bio for hero section (2-3 lines)
    shortBio: "I am a Software Engineer at Maxworth Electronic Systems, working on Warehouse Management Systems across Windows applications, web applications, and backend services using .NET, .NET Core MVC, and WebForms. I focus on building stable, scalable, and performance-driven solutions for real-world business needs.",

    // Detailed bio for About page
    fullBio: `I hold a B.Tech in Computer Science and Engineering from Indraprastha University (Maharaja Surajmal Institute of Technology) and enjoy working as a full-stack developer, handling frontend, backend, and database development.

Previously, I worked as a Software Developer at the Ministry of Education's Innovation Cell (MIC–AICTE), where I contributed to the KAPILA and SIC portals and upgraded the KAPILA backend from PHP 7.4.1 to PHP 8.1.25, improving performance and maintainability.

I am a continuous learner passionate about exploring new technologies and building impactful software driven by a growth mindset.`,

    // Years of experience
    experience: "2+ years",

    // Current status
    currentRole: "Software Engineer at Maxworth Electronic Systems",
    role: "Software Engineer",
    availability: "Open to opportunities", // or "Not looking currently"
  },

  // Skills - organize by category
  skills: {
    languages: [
      "JavaScript",
      "C++",
      "C#",
      "Java",
      "SQL",
      "HTML/CSS"
    ],
    frontend: [
      "React",
      "ASP.NET WebForms",
      "jQuery",
      "Bootstrap",
      "Responsive Design"
    ],
    backend: [
      ".NET Framework",
      ".NET Core MVC",
      "Node.js",
      "Express.js",
      "REST APIs"
    ],
    databases: [
      "MongoDB",
      "SQL Server",
      "MySQL",
      // "PostgreSQL"
    ],
    tools: [
      "Git",
      "Visual Studio",
      "VS Code",
      "Postman",
      // "Docker"
    ],
    other: [
      "MERN Stack",
      "Warehouse Management Systems",
      "Full-Stack Development",
      "Performance Optimization",
      "Agile Methodologies"
    ]
  },

  // Projects - Add your projects here
  projects: [
    {
      id: 1,
      title: "Project Name 1", // UPDATE
      description: "Brief description of what this project does and what problem it solves. Highlight key features and technologies used.", // UPDATE
      image: "/assets/project1.jpg", // UPDATE - Add image to public/assets folder
      technologies: ["React", "Node.js", "MongoDB", "Express"], // UPDATE
      features: [
        "Feature 1: Description",
        "Feature 2: Description",
        "Feature 3: Description"
      ], // UPDATE
      github: "https://github.com/yourusername/project1", // UPDATE or set to null
      demo: "https://project1-demo.com", // UPDATE or set to null
      category: "Web Application", // UPDATE: "Web Application", "Mobile App", "API", "Tool", etc.
      status: "Completed", // or "In Progress"
    },
    {
      id: 2,
      title: "KAPILA Portal Enhancement", // Example - UPDATE with your actual projects
      description: "Upgraded the KAPILA backend from PHP 7.4.1 to PHP 8.1.25, improving performance and maintainability. Contributed to portal development for the Ministry of Education's Innovation Cell.",
      image: "/assets/kapila.jpg",
      technologies: ["PHP 8.1", "MySQL", "JavaScript", "Bootstrap"],
      features: [
        "Backend upgrade to PHP 8.1.25",
        "Performance optimization",
        "Enhanced security features",
        "Improved error handling"
      ],
      github: null, // Government project
      demo: null,
      category: "Web Application",
      status: "Completed",
    },
    {
      id: 3,
      title: "Warehouse Management System", // Example - UPDATE
      description: "Enterprise-level WMS built with .NET Core MVC for managing inventory, orders, and logistics operations.",
      image: "/assets/wms.jpg",
      technologies: [".NET Core MVC", "C#", "SQL Server", "jQuery"],
      features: [
        "Real-time inventory tracking",
        "Order management system",
        "Reporting and analytics",
        "Multi-user role-based access"
      ],
      github: null, // Corporate project
      demo: null,
      category: "Enterprise Software",
      status: "In Progress",
    },
    // Add more projects...
  ],

  // Education
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Maharaja Surajmal Institute of Technology",
      university: "Indraprastha University",
      year: "2020 - 2024",
      grade: "8.8 CGPA", // UPDATE THIS
      location: "Delhi, India"
    },
    {},
    {
      degree: "Senior Secondary Education",
      institution: "Shiksha Niketan Sr Secondary School",
      // university: "Indraprastha University",
      year: "2018 - 2020",
      grade: "93.4%", // UPDATE THIS
      location: "Jammu & Kashmir, India"
    },
    {},
    {
      degree: "Secondary Education",
      institution: "St. John's Convent School",
      // university: "Indraprastha University",
      year: "2016 - 2018",
      grade: "93.4%", // UPDATE THIS
      location: "Jammu & Kashmir, India"
    },

    // Add more education entries if needed
  ],

  // Certifications
  certifications: [
    {
      name: "Internship_Completion_Certificate", // UPDATE
      issuer: "AICTE",
      date: "March 2024 - June 2024", // UPDATE
      credentialUrl: "https://drive.google.com/file/d/18cOzV1Loagn3y8hUjrIF_1xxjXCCWXeG/view?usp=drive_link", // UPDATE
      description: "This certificate showcases the projects I've worked on." // UPDATE
    },
    // Add more certifications
  ],

  // Achievements & Metrics (optional but impressive)
  achievements: [
    {
      name: "AICTE PMSSS Scholar", // UPDATE
      issuer: "AICTE",
      date: "2020", // UPDATE
      credentialUrl: "https://drive.google.com/file/d/18cOzV1Loagn3y8hUjrIF_1xxjXCCWXeG/view?usp=drive_link", // UPDATE
      description: "Recipient of J&K Scholarship on Merit Basis, including maintenance allowance & academic fee" // UPDATE
    },
    // Add more achievements
  ],

  // Work Experience
  experience: [
    {
      company: "Maxworth Electronic Systems",
      position: "Software Engineer",
      duration: "July 2024 - Present", // UPDATE
      location: "Delhi, India", // UPDATE
      description: "Working on Warehouse Management Systems across Windows applications, web applications, and backend services using .NET, .NET Core MVC, and WebForms.",
      responsibilities: [
        "Developed and maintained WMS applications",
        "Built scalable backend services",
        "Optimized application performance",
        "Collaborated with cross-functional teams"
      ],
      technologies: [".NET", " ", ".NET Core MVC", " ", "C#", " ", "SQL Server", " ", "WebForms", " ", "JavaScript", " ", "Bootstrap"]
    },
    {
      company: "Ministry of Education - Innovation Cell (MIC-AICTE)",
      position: "Software Developer",
      duration: "March 2024 - June 2024", // UPDATE
      location: "Delhi, India", // UPDATE
      description: "Contributed to KAPILA and SIC portals, upgraded backend infrastructure, and improved system performance.",
      responsibilities: [
        "Upgraded KAPILA backend from PHP 7.4.1 to PHP 8.1.25",
        "Developed features for KAPILA and SIC portals",
        "Improved performance and maintainability",
        "Fixed critical bugs and enhanced security"
      ],
      technologies: ["PHP", " ", "MySQL", " ", "Laravel", " ", "JavaScript", " ", "Bootstrap"]
    }
  ],

  // SEO & Meta Information
  seo: {
    title: "Harsh Sharma - Software Engineer Portfolio",
    description: "Portfolio of Harsh Sharma, a Software Engineer specializing in .NET, MERN stack, and full-stack development. Building scalable systems with clean code.",
    keywords: "Harsh Sharma, Software Engineer, Full Stack Developer, .NET Developer, MERN Stack, React, Node.js, Portfolio",
    author: "Harsh Sharma",
    ogImage: "/assets/og-image.jpg" // UPDATE - Add Open Graph image for social sharing
  }
};

// Export individual sections for easier imports
export const { name, title, tagline, location, contact, social, resume, about, skills, projects, education, certifications, achievements, experience: workExperience, seo } = personalData;

export default personalData;
