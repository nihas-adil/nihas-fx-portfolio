import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const removeOriginalVideosFromBuild = {
  name: 'remove-original-videos-from-production-build',
  apply: 'build',
  closeBundle() {
    const originalVideos = resolve(process.cwd(), 'dist', 'videos')

    if (existsSync(originalVideos)) {
      rmSync(originalVideos, { recursive: true, force: true })
      console.log('Removed original videos from production build.')
    }
  },
}

export default defineConfig({
  plugins: [react(), removeOriginalVideosFromBuild],
  server: { host: '0.0.0.0' },
})
