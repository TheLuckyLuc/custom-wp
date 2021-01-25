const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const buildPath = isDevelopment ? '/your-site/wp-content/themes/brace/dist/' : './';

const pluginOptions = isDevelopment
	? [
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
			}),
			new SVGSpritemapPlugin('src/img/**/*.svg', {
				output: {
					svg4everybody: true,
				},
			}),
			new BrowserSyncPlugin({
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost/your-site',
				files: ['**/*.php', './dist/css/*.css', './dist/js/*.js'],
			}),
	  ]
	: [
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
			}),
			new SVGSpritemapPlugin('src/img/**/*.svg', {
				output: {
					svg4everybody: true,
				},
			}),
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
	  ];

module.exports = {
	entry: path.resolve(__dirname, 'src', 'js', 'index.ts'),
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: buildPath,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},
	plugins: pluginOptions,
	watch: isDevelopment,
	devtool: 'source-map',
	mode: isDevelopment ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					'ts-loader',
				],
			},
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
					isDevelopment
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								options: {
									publicPath: '../',
								},
						  },
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
				test: /\.svg$/,
				type: 'asset/source',
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name]-[hash][ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name]-[hash][ext]',
				},
			},
		],
	},
};
