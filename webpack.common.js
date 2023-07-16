const path = require('path');
const globule = require('globule');
const PugPlugin = require('pug-plugin');

const outputPath = path.join(__dirname, 'dist');

const viewTemplateFiles = {};
globule.find('src/views/*.pug').forEach((filePath) => {
  Object.assign(viewTemplateFiles, {
    [filePath.split(/\/|.pug/).splice(-2, 1)]: path.resolve(__dirname, filePath),
  });
});

module.exports = {
  entry: {
    // ...viewTemplateFiles,
    index: path.resolve(__dirname, 'src/views/pages/index.page.pug'),
  },

  output: {
    path: outputPath,
    publicPath: '/',
    clean: true,
    filename: 'js/[name].[contenthash:8].js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      JAVASCRIPTS: path.join(__dirname, 'src/js/'),
      TYPESCRIPTS: path.join(__dirname, 'src/ts/'),
      STYLES: path.join(__dirname, 'src/scss/'),
      IMAGES: path.join(__dirname, 'src/img/'),
      ICONS: path.join(__dirname, 'src/icons/'),
      FONTS: path.join(__dirname, 'src/fonts/'),
    },
  },

  plugins: [
    new PugPlugin({
      extractCss: {
        filename: (pathData) => {
          console.log(pathData);
          return 'css/[name].[contenthash:8].css';
        },
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /.pug$/,
        loader: PugPlugin.loader,
      },

      {
        test: /\.(png|svg|jpe?g|gif|webp|ico)$/i,
        type: 'asset/resource',
        include: /img/,
        resourceQuery: { not: [/inline/] }, // ignore images with `?inline` query
        generator: {
          filename: (pathData) => {
            return path
              .join(path.dirname(pathData.filename).replace('src/', ''), '[name][ext][query]')
              .replace(/\\/g, '/');
          },
          // example how to generate dynamic filename
          // filename: (pathData) => (pathData.filename.endsWith('favicon.ico') ? 'favicon.ico' : filename),
        },
      },

      {
        test: /\.(png|jpe?g|webp)/,
        type: 'asset/resource',
        use: {
          loader: 'responsive-loader',
          options: {
            // output filename of images
            name: 'img/[name].[hash:8]-[width]w.[ext]',
          },
        },
        generator: {
          filename: (pathData) => {
            console.log(
              path
                .join(path.dirname(pathData.filename).replace('src/', ''), '[name][ext][query]')
                .replace(/\\/g, '/')
            );

            return path
              .join(path.dirname(pathData.filename).replace('src/', ''), '[name][ext][query]')
              .replace(/\\/g, '/');
          },
          // example how to generate dynamic filename
          // filename: (pathData) => (pathData.filename.endsWith('favicon.ico') ? 'favicon.ico' : filename),
        },
      },

      {
        test: /\.(svg)$/i,
        type: 'asset/inline',
        resourceQuery: /inline/,
      },

      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/,
      },

      {
        test: /\.(tsx|ts)$/,
        use: ['ts-loader'],
        exclude: /(node_modules|bower_components)/,
      },

      {
        test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
        type: 'asset/resource',
        include: /fonts|node_modules/, // fonts from `assets/fonts` or `node_modules` directory only
        generator: {
          filename: (pathData) => {
            return path
              .join(path.dirname(pathData.filename).replace('src/', ''), '[name][ext][query]')
              .replace(/\\/g, '/');
          },
        },
      },
    ],
  },
};
