const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	mode: "production",
	entry: {
		index: {
			import: './src/index.ts',
			dependOn: ['p5shared', 'bootstrapShared',]
		},
		// dmdObj: {
		// 	import: './src/dmd-obj.ts',
		// 	dependOn: 'p5shared'
		// },
		// dmdPlatform: {
		// 	import: './src/dmd-platform.ts',
		// 	dependOn: 'p5shared'
		// },
		// stripInfo: {
		// 	import: './src/stripinfo.ts',
		// },
		// dmdService: {
		// 	import: './src/dmdservice.ts'
		// },
		// shared: 'lodash',
		p5shared: 'p5',
		bootstrapShared: "bootstrap"
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: './dist',
		hot: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: '/',
		pathinfo: false
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: "webpack-starter"
		}),
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false
		}),
		new WorkboxPlugin.GenerateSW({
			// 这些选项帮助快速启用 ServiceWorkers
			// 不允许遗留任何“旧的” ServiceWorkers
			clientsClaim: true,
			skipWaiting: true,
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		// new MiniCssExtractPlugin({
		// 	filename: '[name]-[contenthash].css'
		// })
		new MiniCssExtractPlugin({
			// 与 webpackOptions.output 中的选项相似
			// 所有的选项都是可选的
			filename: "[name]-[contenthash].css",
			chunkFilename: "[id].css",
		}),
	],
	optimization: {
		runtimeChunk: 'single',
		moduleIds: 'deterministic',
		splitChunks: {
			// chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/i,
				include: path.resolve(__dirname, "src"),
				loader: 'babel-loader'
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				// include: [
				// 	'/node_modules/bootstrap/dist/css/bootstrap.min.css'
				// ]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|wtf|woff2|ttf|otf)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.xml$/i,
				use: ["xml-loader"]
			},
			{
				test: /\.csv$/i,
				use: ['csv-loader']
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// 在开发过程中回退到 style-loader
					process.env.NODE_ENV !== "production"
						? "style-loader"
						: MiniCssExtractPlugin.loader,
					// MiniCssExtractPlugin.loader,
					// {
					// 	loader: 'style-loader', // inject CSS to page
					// 	options: {
					// 		sourceMap: true,
					// 	},
					// },
					{
						loader: 'css-loader', // translates CSS into CommonJS modules
						options: {
							sourceMap: true,
						},
					},
					// {
					// 	loader: 'postcss-loader', // Run post css actions
					// 	options: {
					// 		sourceMap: true,
					// 	},
					// },
					{
						loader: 'sass-loader',// compiles SASS to CSS,
						options: {
							sourceMap: true,
						},
					}
				]
				// include: path.resolve(__dirname, "src"),

			}
		]
	}

};