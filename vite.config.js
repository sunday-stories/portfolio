import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ghPages from 'vite-plugin-gh-pages';

const repoName = 'portfolio';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
