export const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cpp',
  'csharp', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
  'html', 'css', 'sql', 'bash', 'json', 'yaml', 'markdown', 'plaintext'
];

export const LANGUAGE_COLORS = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3572a5',
  java: '#b07219',
  c: '#555555',
  cpp: '#f34b7d',
  csharp: '#178600',
  go: '#00add8',
  rust: '#dea584',
  ruby: '#701516',
  php: '#4f5d95',
  swift: '#fa7343',
  kotlin: '#a97bff',
  html: '#e44b23',
  css: '#264de4',
  sql: '#e38c00',
  bash: '#89e051',
  json: '#292929',
  yaml: '#cb171e',
  markdown: '#083fa1',
  plaintext: '#6e7681',
};

export const getLangColor = (lang) =>
  LANGUAGE_COLORS[lang?.toLowerCase()] || '#6e7681';
