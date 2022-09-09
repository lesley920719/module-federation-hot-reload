const deps = require('./package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV === 'dev';

const config = {
  entry: './index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    clean: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'component_app',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button.jsx',
        './Dialog': './src/Dialog.jsx',
        './Logo': './src/Logo.jsx',
        './ToolTip': './src/ToolTip.jsx',
      },
      shared: {
        "react": {
          requiredVersion: deps.react,
          singleton: true
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true
        },
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  // 本项目运行调试时 hot reload fix
  optimization: devMode ? {
    runtimeChunk: 'single',
  } : {},
  devServer: { 
    port: 3002,
    hot: true,
    liveReload: true,
    // needed for HMR
    devMiddleware: { 
      // 将文件写入配置指定的磁盘位置--用于模块联邦监听文件变化
      writeToDisk: true, 
    }
  }
};


// 设置了ModuleFederationPlugin后，需添加optimization： { runtimeChunk: 'single' }本项目单独调试才会热更新
// 本项目单独运行调试时（yarn dev）  hot reload fix
if(devMode) {
  config.optimization = { runtimeChunk: 'single' }
}


module.exports = config;
