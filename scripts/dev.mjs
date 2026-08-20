#!/usr/bin/env node
// Watch src/client.cjs and rewrite lib/client.js on change. The dsh --dev
// HMR node half stat-polls that bundle and hot-reloads the browser plugin,
// so no restart or page refresh is needed. Host changes still need a full
// `pnpm build` and a dsh restart.
import { context } from 'esbuild'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { wrapClient } from './wrap-client.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'lib')
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))

await mkdir(out, { recursive: true })

const client = await context({
  entryPoints: [join(root, 'src/client.cjs')],
  outfile: join(out, 'client.js'),
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  bundle: true,
  external: ['react'],
  write: false,
  plugins: [{
    name: 'wrap-module-loader',
    setup(build) {
      build.onEnd(async (result) => {
        if (result.errors.length) return
        await writeFile(join(out, 'client.js'), wrapClient(result.outputFiles[0].text, pkg.name))
        console.log(`[dev] rebuilt lib/client.js at ${new Date().toLocaleTimeString()}`)
      })
    },
  }],
})

await client.watch()
console.log('[dev] watching src/client.cjs — pair with: npx @deepseek-ai/dsh --profile web --dev')
