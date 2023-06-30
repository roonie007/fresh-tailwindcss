/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import '$std/dotenv/load.ts';

import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';

import tailwindPlugin from 'https://deno.land/x/fresh_tailwindcss@1.0.0/mod.ts';
import tailwindConfig from './tailwind.config.js';

await start(manifest, {
  plugins: [
    tailwindPlugin({
      mode: 'development',
      input: './style.css',
      verbose: false,
      tailwindConfig,
    }),
  ],
});
