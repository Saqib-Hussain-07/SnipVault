import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';

export default function CodeBlock({ code, language, maxLines }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code, language]);

  const displayCode = maxLines
    ? code.split('\n').slice(0, maxLines).join('\n') + (code.split('\n').length > maxLines ? '\n…' : '')
    : code;

  const lang = language?.toLowerCase() === 'plaintext' ? 'markup' : (language?.toLowerCase() || 'markup');

  return (
    <pre className={`language-${lang}`} style={{ margin: 0 }}>
      <code ref={ref} className={`language-${lang}`}>{displayCode}</code>
    </pre>
  );
}
