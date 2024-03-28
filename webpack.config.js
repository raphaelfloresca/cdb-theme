// This comes from https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/webpack.config.js
const wpConfig = require('@wordpress/scripts/config/webpack.config');
const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
  ...wpConfig,
  entry: getEntryPoints(path.resolve(__dirname, 'src')),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DependencyExtractionWebpackPlugin({
      injectPolyfill: true,
      getDynamicDependencies(file) {
        const dependencies = [];
        const content = fs.readFileSync(file, 'utf-8');

        const regex = /require\(\s*['"]@wordpress\/([^'"]+)['"]\s*\)/g;
        let match;

        while ((match = regex.exec(content)) !== null) {
          dependencies.push(`wp.${match[1]}`);
        }

        return dependencies;
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*.php', // Copy PHP files from src to build
          to: '[path][name][ext]', // Maintain folder structure
          context: path.resolve(__dirname, 'src')
        },
        {
          from: '**/*.json', // Copy JSON files from src to build
          to: '[path][name][ext]', // Maintain folder structure
          context: path.resolve(__dirname, 'src')
        }
      ]
    })
  ]
};

function getEntryPoints(directory) {
  const entryPoints = {};

  scanDirectory(directory);

  return entryPoints;

  function scanDirectory(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.resolve(dir, file);

      if (fs.statSync(fullPath).isDirectory()) {
        scanDirectory(fullPath);
      } else {
        const ext = path.extname(file);
        if (ext === '.js' || ext === '.jsx' || ext === '.ts' || ext === '.tsx') {
          const relativePath = path.relative(directory, fullPath).replace(ext, '');
          const entryName = normalizeEntryName(relativePath);
          entryPoints[entryName] = fullPath;
        }
      }
    });
  }

  function normalizeEntryName(filePath) {
    return filePath.split(path.sep).join('/');
  }
}
