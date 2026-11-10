const coverBase = '/assets/products/cheatsheets/covers';
const fileBase = '/assets/products/cheatsheets/files';

export const cheatsheetProducts = [
  {
    slug: 'ai-terms-cheatsheet',
    title: 'AI Terms & Terminology Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for understanding Artificial Intelligence, Generative AI and Large Language Model terms.',
    mark: 'AI', tone: 'navy',
    coverImage: `${coverBase}/yusuf-aiman-ai-terms-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-ai-terms-cheatsheet.pdf`,
    tags: ['AI', 'Artificial Intelligence', 'Generative AI', 'Machine Learning', 'LLM'], pages: 7, status: 'available'
  },
  {
    slug: 'cybersecurity-checklist',
    title: 'Cybersecurity Checklist',
    type: 'Checklist',
    category: 'Cheat Sheets',
    description: '12 basic steps to protect your online accounts, devices, personal data and recovery options.',
    mark: 'CS', tone: 'blue',
    coverImage: `${coverBase}/yusuf-aiman-cybersecurity-checklist.png`, fileUrl: `${fileBase}/yusuf-aiman-cybersecurity-checklist.pdf`,
    tags: ['Cybersecurity', 'Security', 'Digital Safety', 'Online Protection', 'MFA'], pages: 5, status: 'available'
  },
  {
    slug: 'data-privacy-checklist',
    title: 'Data Privacy Checklist',
    type: 'Checklist',
    category: 'Cheat Sheets',
    description: '10 settings to review so you know what your apps, devices and accounts can access.',
    mark: 'DP', tone: 'sky',
    coverImage: `${coverBase}/yusuf-aiman-data-privacy-checklist.png`, fileUrl: `${fileBase}/yusuf-aiman-data-privacy-checklist.pdf`,
    tags: ['Data Privacy', 'Privacy Settings', 'Personal Data', 'Digital Life', 'Online Accounts'], pages: 6, status: 'available'
  },
  {
    slug: 'file-extensions-cheatsheet',
    title: 'File Extensions Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Identify file formats, understand their uses and choose the right application to open them.',
    mark: 'FX', tone: 'sky',
    coverImage: `${coverBase}/yusuf-aiman-file-extension-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-file-extension-cheatsheet.pdf`,
    tags: ['File Extensions', 'File Formats', 'PDF', 'DOCX', 'CSV', 'Software'], pages: 8, status: 'available'
  },
  {
    slug: 'computer-networking-cheatsheet',
    title: 'Computer Networking Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: '20 basic networking terms every beginner should know, from LAN and routers to DNS and packets.',
    mark: 'NET', tone: 'navy',
    coverImage: `${coverBase}/yusuf-aiman-networking-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-networking-cheatsheet.pdf`,
    tags: ['Networking', 'LAN', 'WAN', 'Router', 'DNS', 'TCP', 'Internet'], pages: 6, status: 'available'
  },
  {
    slug: 'pdf-tools-cheatsheet',
    title: 'PDF Tools Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: '12 PDF operations for organising, optimising, converting, editing and protecting documents.',
    mark: 'PDF', tone: 'blue',
    coverImage: `${coverBase}/yusuf-aiman-pdf-tools-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-pdf-tools-cheatsheet.pdf`,
    tags: ['PDF', 'Merge', 'Split', 'Compress', 'Convert', 'Annotate', 'Digital Documents'], pages: 6, status: 'available'
  },
  {
    slug: 'prompt-engineering-cheatsheet',
    title: 'Prompt Engineering Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A beginner guide to structuring tasks, goals, inputs, constraints and better prompt formats.',
    mark: 'PE', tone: 'navy',
    coverImage: `${coverBase}/yusuf-aiman-prompt-engineering-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-prompt-engineering-cheatsheet.pdf`,
    tags: ['Prompt Engineering', 'AI', 'Generative AI', 'LLM', 'Productivity', 'Writing Prompts'], pages: 6, status: 'available'
  },
  {
    slug: 'python-cheatsheet',
    title: 'Python Cheatsheet',
    type: 'Quick Reference',
    category: 'Cheat Sheets',
    description: 'Essential Python syntax for coding with confidence, from variables and data types to functions.',
    mark: 'PY', tone: 'blue',
    coverImage: `${coverBase}/yusuf-aiman-python-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-python-cheatsheet.pdf`,
    tags: ['Python', 'Programming', 'Coding', 'Syntax', 'Beginner Programming', 'Data Types'], pages: 6, status: 'available'
  },
  {
    slug: 'software-development-life-cycle-cheatsheet',
    title: 'Software Development Life Cycle Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Seven phases from idea planning to maintenance for understanding the software development lifecycle.',
    mark: 'SDLC', tone: 'navy',
    coverImage: `${coverBase}/yusuf-aiman-sdlc-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-sdlc-cheatsheet.pdf`,
    tags: ['SDLC', 'Software Development', 'Planning', 'Testing', 'Deployment', 'Maintenance'], pages: 7, status: 'available'
  },
  {
    slug: 'software-categories-cheatsheet',
    title: 'Software Categories Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'Learn 10 common software categories and understand the role of each one in the software ecosystem.',
    mark: 'SW', tone: 'sky',
    coverImage: `${coverBase}/yusuf-aiman-software-categories-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-software-categories-cheatsheet.pdf`,
    tags: ['Software', 'Applications', 'Operating System', 'Productivity', 'Security', 'Database'], pages: 7, status: 'available'
  },
  {
    slug: 'sql-cheatsheet',
    title: 'SQL Cheatsheet',
    type: 'Quick Reference',
    category: 'Cheat Sheets',
    description: 'Essential SQL commands for beginners, including SELECT, FROM, WHERE and relational database basics.',
    mark: 'SQL', tone: 'navy',
    coverImage: `${coverBase}/yusuf-aiman-sql-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-sql-cheatsheet.pdf`,
    tags: ['SQL', 'Database', 'Queries', 'Database Management', 'Programming', 'SQLite'], pages: 6, status: 'available'
  },
  {
    slug: 'windows-keyboard-shortcuts-cheatsheet',
    title: 'Windows Keyboard Shortcuts Cheatsheet',
    type: 'Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A Windows keyboard shortcut reference to make everyday work faster and more practical.',
    mark: 'WIN', tone: 'blue',
    coverImage: `${coverBase}/yusuf-aiman-windows-shortcuts-cheatsheet.png`, fileUrl: `${fileBase}/yusuf-aiman-windows-shortcuts-cheatsheet.pdf`,
    tags: ['Windows', 'Keyboard Shortcuts', 'Productivity', 'Microsoft', 'Desktop'], pages: 5, status: 'available'
  },
];
