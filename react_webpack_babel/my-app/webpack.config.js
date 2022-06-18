const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {path:path.join(__dirname, "build"), filename: 'index.bundle.js'},
	
	//mode for out output, which is set to `development` for now
	//should be changed to production when the app is build for production
	mode: process.env.NODE_ENV || "development",

	//we can import anything from the src folder in relative paths rather 
	// than the absolute ones, same goes for node_modules as well
	resolve:{modules:[path.resolve(__dirname,"src"),"node_modules"]}, 

	//this tells the webpack-dev-server what files are needed to be served.
	//Everything from our src folder needs to be served 
	//(outputted ) in the browser
	devServer:{static:{
		directory:path.join(__dirname,"src")
	}},
	module:{
		rules:[
			{
				test: /\.(js|jsx)$/,
				exclude:/node_modules/,
				use:["babel-loader"]
			},
			{
				test: /\.(css|scss)$/,
				use:["style-loader","css-loader"],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: ['file-loader']
			}
		]
	},
	//here we set what plugins we need in our app. 
	//as of this moment we only need the html-webpack-plugin 
	//which tells the server that the index.bundle.js should be injected 
	//(or added ) to our index.html file
	plugins:[
		new HtmlWebpackPlugin({
			template:path.join(__dirname,"src", "index.html"),
		}),
	],
};