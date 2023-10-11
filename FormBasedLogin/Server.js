const dotenv=require('dotenv')
const express = require('express')
const path = require('path')
const router = require('./src/Routes/Router')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.port | 8080
dotenv.config()
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/src/public')))
//console.log(__dirname);
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, "/src/templates"))
app.use(express.json())
app.use(router)
app.listen(port, () => { console.log("Server started on ", port); })