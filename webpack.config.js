const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const PATHS = {
	src: path.resolve(__dirname, "src"),
	build: path.resolve(__dirname, "dist")
}

const DEV_MODES = {
	isDev: process.env.NODE_ENV === "development",
	isProd: process.env.NODE_ENV === "production"
}

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		},
		runtimeChunk: 'single'
	}
	if (DEV_MODES.isProd) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

const cssLoaders = loader => {
	const loaders = [
      	{
        	loader: MiniCssExtractPlugin.loader
      	},
      	"css-loader"
    ]
    if (loader) {
    	loaders.push(loader)
    }
    return loaders
}

const babelLoaders = loader => {
	const loaders = {
      	loader: "babel-loader",
      	options: {
        	presets: [
        		"@babel/preset-env",
        	] // add plugins if using experimental syntax
      	}
    }
    if (loader) {
    	loaders.options.presets.push(loader)
    }
    return loaders
}

const filename = ext => DEV_MODES.isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
	context: PATHS.src,
	mode: "development",
	entry: {
		main: ["@babel/polyfill", "./index.jsx"],
		statistics: "./analytics.ts"
	},
	output: {
		filename: filename("js"),
		path: PATHS.build,
		clean: true,
		assetModuleFilename: 'assets/[name][ext][query]'
	},
	resolve: {
		extensions: [".js", ".json", ".ts"],
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
 			filename: filename("css")
 		})
	],
	optimization: optimization(),
	devServer: {
		port: 4200,
		open: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.less$/,
				use: cssLoaders("less-loader")
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders("sass-loader")
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
			},
			{
		        test: /\.m?js$/,
		        exclude: /node_modules/,
		        use: babelLoaders()
		    },
		    {
		        test: /\.m?ts$/,
		        exclude: /node_modules/,
		        use: babelLoaders("@babel/preset-typescript")
		    },
		    {
		        test: /\.jsx$/,
		        exclude: /node_modules/,
		        use: babelLoaders("@babel/preset-react")
		    }
		]
	}
}