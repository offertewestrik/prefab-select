/// <reference types="vite/client" />

// @types/react-dom is niet geïnstalleerd in de repo-root; deze ambient
// declaratie houdt de typecheck schoon zonder extra dependency.
declare module 'react-dom/client';
