const express = require('express')
var path = require('path'); 
const routes = require('./Routes/index')
const app = express()
const port = 4848

//handle CORS
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next()
})

// set public directory to serve static files 
app.use('/', express.static(path.join(__dirname, 'public')))

// redirect to store 
app.get('/' , (req , res) => {
    res.redirect('/index.html'); 
})

//start using this routes
app.use('/', routes)

app.listen(port, () => {
    console.log('Server is running: 4848')
})