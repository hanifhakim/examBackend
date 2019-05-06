const express = require('express')
const cinemaRouter = require('./routers/cinemaRouter')

const app = express()
const port = 2019 // akses dari environment

app.get('/', (req, res) => {
    res.send(`<h1> API RUNNING ON HEROKU PORT ${port} </h1>`)
})

app.use(express.json())
app.use(cinemaRouter)



app.listen(port, ()=>{
    console.log("Running on port:", port);
    
})