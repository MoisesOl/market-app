module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'], // quitar 'chai'
  files: ['src/test.ts'],
  preprocessors: { 'src/test.ts': ['webpack'] },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          { test: /\.ts$/, use: [ { loader: 'ts-loader' } ], exclude: /node_modules/ },
          { test: /\.html$/, use: [{ loader: 'raw-loader', options: { esModule: false } }] },
          { test: /\.scss$/, use: [{ loader: 'raw-loader', options: { esModule: false } }, 'sass-loader'] },
          { test: /\.css$/, use: [{ loader: 'raw-loader', options: { esModule: false } }] }
        ]
      },
      resolve: { extensions: ['.ts', '.js'] }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      includeAllSources: true
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
