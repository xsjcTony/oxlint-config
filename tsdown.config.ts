import { defineConfig } from 'tsdown'


export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  outDir: 'dist',
  clean: true,
  format: ['esm'],
  dts: true,
  exports: {
    packageJson: false,
  },
  platform: 'node',
  shims: true,
  publint: true,
})
