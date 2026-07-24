// ============================================================
// Mock Categories Data
// ============================================================

import {
  Code2, Server, Cloud, Shield, Database, Cpu, Globe, BookOpen,
  Terminal, GitBranch, Layers, Activity, Brain, Zap
} from 'lucide-react';

export const categories = [
  {
    id: 1, name: 'DevOps', slug: 'devops', icon: 'Server',
    description: 'CI/CD, Docker, Kubernetes, Ansible & more',
    courseCount: 48, color: 'from-blue-500 to-cyan-500',
    subcategories: ['Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Terraform'],
  },
  {
    id: 2, name: 'Cloud Computing', slug: 'cloud', icon: 'Cloud',
    description: 'AWS, Azure, GCP & multi-cloud architectures',
    courseCount: 62, color: 'from-cyan-500 to-teal-500',
    subcategories: ['AWS', 'Azure', 'GCP', 'Cloud Architecture', 'FinOps'],
  },
  {
    id: 3, name: 'Web Development', slug: 'web-development', icon: 'Globe',
    description: 'React, Next.js, Node.js, Vue & full-stack',
    courseCount: 85, color: 'from-violet-500 to-purple-500',
    subcategories: ['React', 'Next.js', 'Node.js', 'Vue.js', 'TypeScript'],
  },
  {
    id: 4, name: 'Data Science', slug: 'data-science', icon: 'Activity',
    description: 'Python, ML, AI, TensorFlow & deep learning',
    courseCount: 54, color: 'from-orange-500 to-amber-500',
    subcategories: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
  },
  {
    id: 5, name: 'Cyber Security', slug: 'cyber-security', icon: 'Shield',
    description: 'Ethical hacking, pentesting & cyber defense',
    courseCount: 36, color: 'from-red-500 to-rose-500',
    subcategories: ['Ethical Hacking', 'Penetration Testing', 'SOC', 'Forensics', 'OSINT'],
  },
  {
    id: 6, name: 'Linux', slug: 'linux', icon: 'Terminal',
    description: 'Linux administration, bash scripting & servers',
    courseCount: 28, color: 'from-yellow-500 to-orange-500',
    subcategories: ['Shell Scripting', 'System Admin', 'Networking', 'Security', 'Automation'],
  },
  {
    id: 7, name: 'Programming', slug: 'programming', icon: 'Code2',
    description: 'Python, Java, C++, Go & competitive coding',
    courseCount: 92, color: 'from-green-500 to-emerald-500',
    subcategories: ['Python', 'Java', 'C++', 'Go', 'Rust'],
  },
  {
    id: 8, name: 'Databases', slug: 'databases', icon: 'Database',
    description: 'SQL, NoSQL, PostgreSQL, MongoDB & Redis',
    courseCount: 31, color: 'from-indigo-500 to-blue-500',
    subcategories: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Cassandra'],
  },
  {
    id: 9, name: 'AI & Machine Learning', slug: 'ai-ml', icon: 'Brain',
    description: 'Generative AI, LLMs, PyTorch & production ML',
    courseCount: 43, color: 'from-pink-500 to-rose-500',
    subcategories: ['Generative AI', 'LLMs', 'PyTorch', 'TensorFlow', 'MLOps'],
  },
  {
    id: 10, name: 'School – Class 9-12', slug: 'school', icon: 'BookOpen',
    description: 'CBSE curriculum for Class 9, 10, 11 & 12',
    courseCount: 120, color: 'from-teal-500 to-cyan-500',
    subcategories: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'JEE Prep'],
  },
  {
    id: 11, name: 'Engineering', slug: 'engineering', icon: 'Cpu',
    description: 'CS, Mechanical, Civil, Electrical & Electronics',
    courseCount: 78, color: 'from-blue-600 to-indigo-500',
    subcategories: ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Electronics'],
  },
  {
    id: 12, name: 'Version Control', slug: 'version-control', icon: 'GitBranch',
    description: 'Git, GitHub, GitLab & branching strategies',
    courseCount: 18, color: 'from-orange-600 to-red-500',
    subcategories: ['Git', 'GitHub', 'GitLab', 'GitHub Actions', 'Git Flow'],
  },
];

export const learningPaths = [
  {
    id: 1,
    title: 'DevOps Engineer',
    description: 'Linux → Docker → Kubernetes → CI/CD → Cloud → Monitoring',
    duration: '6 months',
    courses: 8,
    level: 'Beginner to Advanced',
    color: 'from-blue-600 to-cyan-500',
    icon: 'Server',
    skills: ['Linux', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform'],
  },
  {
    id: 2,
    title: 'Cloud Architect',
    description: 'AWS Fundamentals → Networking → Security → Architecture → Multi-Cloud',
    duration: '4 months',
    courses: 6,
    level: 'Intermediate',
    color: 'from-cyan-600 to-teal-500',
    icon: 'Cloud',
    skills: ['AWS', 'Azure', 'GCP', 'IaC', 'Security', 'Cost Optimization'],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    description: 'HTML/CSS → JavaScript → React → Node.js → Database → Deploy',
    duration: '5 months',
    courses: 7,
    level: 'Beginner',
    color: 'from-violet-600 to-purple-500',
    icon: 'Globe',
    skills: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'Vercel'],
  },
  {
    id: 4,
    title: 'Data Scientist',
    description: 'Python → Statistics → ML → Deep Learning → Deploy ML Models',
    duration: '7 months',
    courses: 9,
    level: 'Beginner',
    color: 'from-orange-600 to-amber-500',
    icon: 'Activity',
    skills: ['Python', 'Pandas', 'Sklearn', 'TensorFlow', 'MLOps', 'SQL'],
  },
  {
    id: 5,
    title: 'Security Engineer',
    description: 'Networking → Linux → Ethical Hacking → Pentesting → SOC Operations',
    duration: '5 months',
    courses: 7,
    level: 'Intermediate',
    color: 'from-red-600 to-rose-500',
    icon: 'Shield',
    skills: ['Networking', 'Kali Linux', 'Metasploit', 'Burp Suite', 'SIEM', 'Forensics'],
  },
  {
    id: 6,
    title: 'AI Engineer',
    description: 'Python → ML → LLMs → RAG → LangChain → Production AI Systems',
    duration: '6 months',
    courses: 8,
    level: 'Intermediate',
    color: 'from-pink-600 to-rose-500',
    icon: 'Brain',
    skills: ['Python', 'PyTorch', 'LangChain', 'RAG', 'Vector DBs', 'MLOps'],
  },
];
