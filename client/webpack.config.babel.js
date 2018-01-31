import path from 'path';
import handlebars from 'handlebars';
import {StatsWriterPlugin} from 'webpack-stats-plugin';
import {EnvironmentPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import autoprefixer from 'autoprefixer';
import formatter from 'eslint-friendly-formatter';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import nodeFetch from 'node-fetch'
import {JSDOM} from 'jsdom';
import {get} from './src/js/modules/http/actions';
import createStore from './src/js/modules/bootstrap';
import App from './src/js/containers/App';

const {NODE_ENV} = process.env;
const isDev = NODE_ENV === 'development';
const base = path.resolve.bind(path, __dirname);
const {window} = new JSDOM();
const {document} = window;
const store = createStore();

global.document = document;
global.window = window;
global.fetch = nodeFetch;

const styleLoader = {
  loader: 'style-loader'
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ])
  }
};

const cssLoader = ({local} = {}) => {
  const options = local
    ? {
      sourceMap: true,
      importLoaders: 1,
      modules: true,
      camelCase: true,
      localIdentName: '[name]_[local]_[hash:base64:5]',
      minimize: false
    }
    : {
      sourceMap: true,
      importLoaders: 1,
      minimize: false
    };

  return {
    loader: 'css-loader',
    options
  };
};

const extract = (loaders) => {
  if (isDev) return loaders;

  return ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: loaders.splice(-2)
  });
}

export default async () => {
  await store.dispatch(get);

  const app = new App(store);

  const options = {
    APP: new handlebars.SafeString(app.el.outerHTML),
    STORE_STATE: new handlebars.SafeString(JSON.stringify(store.getState()))
  };

  const plugins = [
    new EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebPackPlugin({
      template: '!!handlebars-loader!src/templates/index.hbs',
      ...options
    }),
    new StyleLintPlugin(),
    new CopyWebpackPlugin([
      {
        from: base('node_modules/cryptocurrency-icons/svg/color/'),
        to: base('dist/img/icons')
      },
      {
        from: base('src/img'),
        to: base('dist/img')
      }
    ]),
    new StatsWriterPlugin({
      filename: 'stats.json'
    })
  ];

  if (!isDev) {
    plugins.push(
      new ExtractTextPlugin({
        filename: 'css/main.[chunkhash].css',
        allChunks: true
      })
    );
  }

  return {
    entry: ['./src/js/app.js'],
    output: {
      path: base('dist'),
      filename: 'js/[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            formatter,
            fix: false,
            envs: ['browser']
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    chrome: 66
                  }
                }]
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                'transform-export-extensions'
              ],
              babelrc: false
            }
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          include: base('src', 'js'),
          use: extract([
            styleLoader,
            cssLoader({local: true}),
            postCssLoader
          ])
        },
        {
          test: /\.css$/,
          include: base('src', 'css'),
          use: extract([
            styleLoader,
            cssLoader(),
            postCssLoader
          ])
        }
      ]
    },
    plugins,
    devServer: {
      contentBase: './dist',
      host: '0.0.0.0'
    },
    devtool: isDev ? 'eval-source-map' : 'source-map'
  }
};
