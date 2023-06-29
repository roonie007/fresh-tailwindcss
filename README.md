# Fresh TailwindCSS

A Deno Fresh plugin for [TailwindCSS](https://tailwindcss.com/).

> **Note:** This plugin is still in development and is not yet ready for production use.

> **Note:** This plugin supports only some basic TailwindCSS configuration.

## How it works

Without question, one of the key advantage of utilizing Deno and Fresh lies in their sheer simplicity: no BUILD STEP is required. Simply execute the application and watch it operate as intended. Yet, the introduction of TailwindCSS presents a unique hurdle as it mandates a build step.

To overcome this impediment, this plugin takes advantage of the TailwindCSS CLI to efficiently construct your CSS.

In a **production** mode, the CSS is constructed and cached the very first time a page is loaded by any user. From then on, subsequent page visits will seamlessly leverage the cached CSS, ensuring quick loading times.

Meanwhile, in a **development** mode, the plugin rebuilds your CSS during every page load. This guarantees the most recent styles changes.

## Usage

In your `main.ts` file, import the plugin and add it to the `plugins` array.

```ts
import tailwindPlugin from "https://deno.land/x/fresh-tailwindcss/mod.ts";
import tailwindConfig from "./tailwind.config.ts"; // Your tailwind config

await start(manifest, {
  plugins: [
    tailwindPlugin({
      mode: "development", // or 'production'
      input: "./platform/style.css", // Relative path to the running script
      verbose: false,
      tailwindConfig,
    }),
  ],
});
```

## License

[MIT](./LICENSE)

```

```
