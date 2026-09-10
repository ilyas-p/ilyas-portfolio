export const projects = [
  {
    id: 'codementor-ai',
    number: '01',
    name: 'CodeMentor AI',
    category: 'AI-powered coding platform',
    description:
      "A full-stack, AI-powered interactive coding platform designed to help students learn programming through guided practice.",
    longDescription:
      "Developed a full-stack, AI-powered interactive coding platform designed to help students learn programming through guided practice. The platform pairs a Monaco-based code editor with a secure multi-language execution engine and an AI mentor that gives progressive hints instead of straight answers.",
    features: [
      'Monaco-based code editor',
      'Secure multi-language execution — Python, Java, C',
      'AI mentor with progressive hints',
      'Static code analysis',
      'Personalized learning recommendations',
      'Visual progress analytics',
      'Gamified achievement system',
    ],
    technologies: ['Flask', 'Bootstrap 5', 'Python', 'Monaco Editor', 'Java', 'C', 'AI'],
    visual: 'code',
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'penalty-shootout',
    number: '02',
    name: 'Penalty Shootout — 3D Football Game',
    category: '3D Interactive Game',
    description:
      'An interactive 3D football penalty shootout game built with React, Three.js, and JavaScript.',
    longDescription:
      "Developed an interactive 3D football penalty shootout game using React, Three.js, and JavaScript, complete with realistic player and goalkeeper animations, dynamic ball physics, and touch-based aiming. A Flask and PostgreSQL backend stores player data behind a REST API, deployed on Render.",
    features: [
      'Realistic player animations',
      'Goalkeeper animations',
      'Dynamic ball physics',
      'Touch-based aiming',
      'Scoring logic',
      'Fullscreen support',
      'Flask backend with PostgreSQL database',
      'REST API for player data storage',
      'Deployed on Render',
    ],
    technologies: ['React', 'Three.js', 'JavaScript', 'Flask', 'PostgreSQL', 'REST API', 'Render'],
    visual: 'football',
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'jersey-store',
    number: '03',
    name: 'Online Jersey Store',
    category: 'Django E-commerce Application',
    description:
      'A Django-based e-commerce web application with separate Admin and Customer modules.',
    longDescription:
      "Developed a Django-based e-commerce web application with Admin and Customer modules, covering the full path from browsing to checkout — authentication, a shopping cart, order placement, and an admin dashboard for managing products and orders.",
    features: [
      'User authentication',
      'Product browsing',
      'Shopping cart',
      'Order placement',
      'Admin dashboard',
      'Product management',
      'Order management',
    ],
    technologies: ['Django', 'Python', 'HTML', 'CSS', 'Bootstrap', 'SQLite'],
    visual: 'ecommerce',
    githubUrl: null,
    liveUrl: null,
  },
];
