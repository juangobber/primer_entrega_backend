const express = require('express')
const apiRoutes = require('./routers/app.routers')
const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/api',apiRoutes)



//Run the server
app.listen(PORT, ()=>{
    console.log("Server is up and running on port =>", PORT)
})