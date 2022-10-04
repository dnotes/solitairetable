#!/usr/bin/env node
import fs from 'fs'
let sw = fs.readFileSync('./.svelte-kit/output/client/service-worker.js', 'utf-8')
fs.writeFileSync('./.svelte-kit/output/client/service-worker.js', sw.replace(/process\.env\.NODE_ENV/g, '"production"'))
