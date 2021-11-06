const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

const PATHS = {
	src: path.resolve(__dirname, "src"),
	build: path.resolve(__dirname, "dist")
}

module.exports = {
	context: PATHS.src,
	mode: "development",
	entry: {
		main: "./index.js",
		statistics: "./analytics.js"
	},
	output: {
		filename: "[name].[contenthash].js",
		path: PATHS.build,
		clean: true,
		assetModuleFilename: 'assets/[name][ext][query]'
	},
	resolve: {
		extensions: [".js", ".json"],
		alias: {
			"@": PATHS.src
		}
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./index.html"
		})
	],
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
			    test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource"
			},
			{
				test: /\.xml$/,
				loader: "xml-loader"
			},
			{
				test: /\.csv$/,
				loader: "csv-loader"
			}
		]
	}
}