const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const PATHS = {
	src: path.resolve(__dirname, "src"),
	build: path.resolve(__dirname, "dist")
}

const DEV_MODES = {
	isDev: process.env.NODE_ENV === "development",
	isProd: process.env.NODE_ENV === "production"
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
		}),
		new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'dist/assets/')
                }
            ]
 		}),
 		new MiniCssExtractPlugin({
 			filename: "[name].css"
 		})
	],
	optimization: {
		splitChunks: {
			chunks: "all"
		},
		runtimeChunk: 'single'
	},
	devServer: {
		port: 4200,
		open: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
		          	{
		            	loader: MiniCssExtractPlugin.loader
		          	},
		          	"css-loader"
		        ],
			},
			{
			    test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource"
			},
			{
		        test: /\.(woff|woff2|eot|ttf|otf)$/i,
		        type: 'asset/resource',
		        generator: {
			    	filename: 'assets/fonts/[hash][ext][query]'
			    }
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