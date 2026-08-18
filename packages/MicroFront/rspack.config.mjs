import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { getSharedDependencies } from '../sdk/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  output: {
    uniqueName: 'microFront',
  },
  resolve: {
    ...Repack.getResolveOptions(),
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          parallel: true,
          options: {},
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [
    new Repack.RepackPlugin(),
    new Repack.plugins.ModuleFederationPluginV2({
      name: 'microFront',
      dts: false,
      filename: 'microFront.container.js.bundle',
      exposes: {
        './App': './App.tsx',
        './ClientCardScreen': './src/screens/ClientCardScreen.tsx',
        './EmployeeProfileScreen': './src/screens/EmployeeProfileScreen.tsx',
      },
      shared: getSharedDependencies({ eager: false }),
    }),
  ],
});
