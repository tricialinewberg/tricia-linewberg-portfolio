import { createReadStream, statSync } from 'node:fs';
import { resolve } from 'node:path';

// Vite's static middleware treats a decoded leading # as a URL fragment.
// Serve this original filename before that middleware; keep the public URL intact.
function servePortrait(directory) {
  return (request, response, next) => {
    if (!['GET', 'HEAD'].includes(request.method)) return next();
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (pathname !== '/images/%232a1a30%20(8).png') return next();
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
  plugins: [{
    name: 'original-portrait-filename',
    configureServer(server) {
      server.middlewares.use(servePortrait(server.config.publicDir));
    },
    configurePreviewServer(server) {
      server.middlewares.use(servePortrait(resolve(server.config.root, server.config.build.outDir)));
    },
  }],
};

