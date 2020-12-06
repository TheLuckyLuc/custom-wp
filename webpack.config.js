const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const pluginOptions = isDevelopment
	? [
			new SVGSpritemapPlugin('src/img/svg/*.svg', {
				output: {
					svg4everybody: true,
				},
			}),
			new MiniCssExtractPlugin({
				filename: '../css/[name].css',
			}),
			new BrowserSyncPlugin({
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost/your-site',
				files: ['**/*.php', './dist/css/*.css', './dist/js/*.js'],
			}),
	  ]
	: [
			new SVGSpritemapPlugin(),
			new MiniCssExtractPlugin({
				filename: '../css/[name].css',
			}),
	  ];

module.exports = {
	entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist', 'js'),
	},
	plugins: pluginOptions,
	watch: isDevelopment,
	devtool: 'source-map',
	mode: isDevelopment ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: ['tailwindcss', ...(!isDevelopment ? ['autoprefixer', 'cssnano'] : [])],
							},
						},
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: 'expanded',
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../images',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader',
			},
		],
	},
};
