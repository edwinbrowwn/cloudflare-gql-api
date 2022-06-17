const path = require('path');
const {
  WranglerJsCompatWebpackPlugin,
} = require("wranglerjs-compat-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  plugins: [new WranglerJsCompatWebpackPlugin()],
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  // Cloudflare Worker environment is similar to a webworker
  target: 'webworker',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    // Alias for resolving the Prisma Client properly
    alias: {
      '@prisma/client$': require.resolve('@prisma/client'),
    },
  },
  mode: 'development',
  // Wrangler doesn't like eval which devtools use in development.
  devtool: 'none',
  module: {
    rules: [
      {
        // Compile Typescript code
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript"
              }
            }
          }
        }
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ],
  },
}