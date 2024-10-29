import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: './vite.config.ts',
    test: {
      name: 'unit',
      include: ['**/*.{test,spec}.{js,ts}'],
      environment: 'node'
    },
  },
  {
    extends: './vite.config.ts',
    test: {
      name: 'cucumber',
      include: ['**/*.feature'],
      environment: 'node',
      setupFiles: ['./tests/main.steps.ts'],
    },
  }
])