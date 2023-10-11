const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect("mongodb+srv://kuldeep:kuldeep@mern-todo.a8nid5l.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected with Database");
}).catch((err) => { console.log(err); });

