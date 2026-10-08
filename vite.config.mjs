import { createReadStream, statSync } from 'node:fs';
import { resolve } from 'node:path';

// Vite's static middleware treats a decoded leading # as a URL fragment.
// Serve this original filename before that middleware; keep the public URL intact.
function servePortrait(directory, base) {
  return (request, response, next) => {
    if (!['GET', 'HEAD'].includes(request.method)) return next();
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const imageUrl = 'images/%232a1a30%20(8).png';
    if (pathname !== `/${imageUrl}` && pathname !== `${base}${imageUrl}`) return next();
    const path = resolve(directory, 'images', '#2a1a30 (8).png');
    let stat;
    try { stat = statSync(path); } catch { return next(); }
    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Content-Length', stat.size);
    if (request.method === 'HEAD') return response.end();
    createReadStream(path).on('error', () => response.destroy()).pipe(response);
  };
}

export default {
  // Pages builds opt into the repository path; Vercel and local builds keep '/'.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [{
    name: 'original-portrait-filename',
    configureServer(server) {
      server.middlewares.use(servePortrait(server.config.publicDir, server.config.base));
    },
    configurePreviewServer(server) {
      server.middlewares.use(servePortrait(resolve(server.config.root, server.config.build.outDir), server.config.base));
    },
  }],
};

