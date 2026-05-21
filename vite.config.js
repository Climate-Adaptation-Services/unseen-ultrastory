import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
    fs: {
      allow: ['..']
    }
  },
  // Pre-bundle maplibre-gl so dynamic import resolves a clean ES module with a default export
  optimizeDeps: {
    include: ['maplibre-gl'],
  },
});
