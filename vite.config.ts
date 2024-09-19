import { defineConfig } from 'vite';

// Vite plugins
import { vitePlugin as remix } from '@remix-run/dev';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Remix tools
import { flatRoutes } from 'remix-flat-routes';

declare module '@remix-run/node' {
  interface Future {
    unstable_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes);
      },
      future: {
        unstable_singleFetch: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
