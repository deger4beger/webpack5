const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanPlugin } = require("webpack")

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: {
		main: "./index.js",
		statistics: "./analytics.js"
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./index.html"
		}),
		new CleanPlugin()
	]
}