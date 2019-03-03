const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

dotenv.config();

const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf-8'));

const aliases = {
	icons: path.resolve(__dirname, 'src/icons'),
	utils: path.resolve(__dirname, 'src/utils'),
	views: path.resolve(__dirname, 'src/views'),
	common: path.resolve(__dirname, 'src/common'),
	images: path.resolve(__dirname, 'src/images'),
	styles: path.resolve(__dirname, 'src/styles'),
	components: path.resolve(__dirname, 'src/components')
}

module.exports = {
	name: 'server',
	target: 'node',
	entry: [
		'@babel/polyfill',
		'./src/server.js'
	],
	output: {
		path: path.join(__dirname, `./dist/${package.version}`),
		filename: 'server.bundle.js',
		publicPath: '/dist/'
	},
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			//run all javascript through babel loader
			{
				test: /\.jsx?$/,
				exclude: /(node_modules\/)/,
				loader: 'babel-loader',
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: aliases
	},
	plugins: [
		new Dotenv(),
		new webpack.optimize.OccurrenceOrderPlugin()
	]
};