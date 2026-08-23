import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const postcss = require('postcss');

const ROOT = path.resolve(import.meta.dirname, '..');
const INPUT = path.join(ROOT, 'src/app/globals.css');
const OUTPUT = path.join(ROOT, 'scripts/compiled-tailwind.css');

const config = (await import('../postcss.config.mjs')).default;

const css = await fs.readFile(INPUT, 'utf8');
const plugins = (config.plugins ?? []).map((plugin) => {
  if (typeof plugin === 'string') {
    return require(plugin);
  }
  return plugin;
});

const result = await postcss(plugins).process(css, {
  from: INPUT,
  to: OUTPUT,
});

await fs.writeFile(OUTPUT, result.css);
console.log(`Wrote ${OUTPUT} (${result.css.length} bytes)`);
