// SSR-entry voor prerendering: rendert de app voor één URL naar een HTML-string.
// Wordt door `npm run build` gebundeld (vite build --ssr) en daarna door
// scripts/prerender.mjs aangeroepen voor elke URL uit de sitemap.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App, { blogs, cityPages } from '../src/App';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

export { blogs, cityPages };
