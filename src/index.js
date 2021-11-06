import * as $ from "jquery"
import Status from "@/logic/Status"
import webpackLogo from "./assets/logo.png"
import json from "./assets/json"
import xml from "./assets/data.xml"
import csv from "./assets/data.csv"
import "./styles/styles.css"

const status = new Status("Testing webpack 5", webpackLogo)

$("pre").html(status.toString())

// console.log("Status:", status.toString())
// console.log("JSON: ", json)
// console.log("XML: ", xml)
// console.log("CSV: ", csv)