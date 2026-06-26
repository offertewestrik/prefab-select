// Vite asset imports — give TypeScript a type for bundled image modules.
declare module '*.webp' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.png' { const src: string; export default src; }
declare module '*.svg' { const src: string; export default src; }
declare module '*.avif' { const src: string; export default src; }
