import { isAbsolute, join, postcss, tailwind } from './deps.ts';
import type { Config, Plugin } from './deps.ts';
import preflight from './preflight.ts';

interface PluginConfig {
  mode?: 'development' | 'production';
  input?: string;
  verbose?: boolean;
  tailwindConfig?: Config;
}

let generatedCss = '';
let buildTime = 0;

/**
 * Determines whether the script is running in production mode.
 */
const isInProductionMode = (config: PluginConfig) => {
  return config.mode === 'production' || Deno.env.get('TAILWINDCSS_MODE') === 'production';
};

/**
 * Calculates and logs the time taken to build tailwindcss.
 */
const logBuildTime = (verbose: boolean) => {
  if (!verbose) return;

  if (!buildTime) {
    console.log('[tailwindcss] Building...');
    buildTime = Date.now();
    return;
  }

  buildTime = Date.now() - buildTime;
  console.log(`[tailwindcss] Rebuilt in ${buildTime}ms`);

  buildTime = 0;
};

/**
 * Checks if the input file exists and returns its absolute path.
 */
const getInputFilePath = (input: string) => {
  const inputFilePath = isAbsolute(input) ? input : join(Deno.cwd(), input);
  try {
    Deno.statSync(inputFilePath);
  } catch (_e) {
    throw new Error(`[tailwindcss] No tailwindcss input file found at ${inputFilePath}`);
  }
  return inputFilePath;
};

/**
 * Builds tailwindcss with the provided tailwindConfig and input file content.
 */
const buildTailwindcss = (inputFilePath: string, tailwindConfig: Config) => {
  const tailwindBaseConfig = {
    ...tailwindConfig,
    content: (tailwindConfig.content as string[]).map((content) => join(Deno.cwd(), content)),
    corePlugins: {
      ...tailwindConfig?.corePlugins ?? {},
      preflight: false,
    },
  };

  const inputText = Deno.readTextFileSync(inputFilePath);
  return postcss([tailwind(tailwindBaseConfig)]).process(inputText, { from: inputFilePath }).css;
};

export default (config: PluginConfig): Plugin => ({
  name: 'tailwindcss',
  render(ctx) {
    ctx.render();
    const { input = 'styles.css', tailwindConfig, verbose = false } = config;

    if (isInProductionMode(config) && generatedCss) {
      return {
        scripts: [],
        styles: [{ cssText: generatedCss }],
      };
    }

    logBuildTime(verbose);
    generatedCss = preflight + '\n' + buildTailwindcss(getInputFilePath(input), tailwindConfig || { content: [] });
    logBuildTime(verbose);

    return {
      scripts: [],
      styles: [{ cssText: generatedCss }],
    };
  },
});
