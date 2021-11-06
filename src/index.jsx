import React from "react"
import { render } from "react-dom"
import * as $ from "jquery"
import Status from "@/logic/Status"
import webpackLogo from "./assets/logo.png"
import json from "./assets/json"
import xml from "./assets/data.xml"
import csv from "./assets/data.csv"
import "./babel.js"
import "./styles/styles.css"
import "./styles/less.less"
import "./styles/scss.scss"

const status = new Status("Testing webpack 5", webpackLogo)
$("pre").html(status.toString())

const App = () => (
	<>
		<div className="title">
			Webpack hello
		</div>

		<hr/>

		<div className="logoWrapper">
			<div className="logo"></div>
		</div>

		<hr/>

		<pre />

		<div className="lessWrapper">
			<div class="less">
				Less styles
			</div>
		</div>

		<div className="sassWrapper">
			<div className="sass">
				Sass styles
			</div>
		</div>
	</>
)


render(<App />, document.getElementById("app"))
// console.log("Status:", status.toString())
// console.log("JSON: ", json)
// console.log("XML: ", xml)
// console.log("CSV: ", csv)