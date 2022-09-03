#!/usr/bin/env node
import fs from 'fs'
let sw = fs.readFileSync('./docs/service-worker.js', 'utf-8')
fs.writeFileSync('./docs/service-worker.js', sw.replace(/process\.env\.NODE_ENV/g, '"production"'))