import express from 'express';
import cors from 'cors'
import {router} from './routes/route.js'



const app = express()
app.use(cors())
app.use(express.static('src/build'))
app.use(express.json())
app.use(router)

app.use(function(req,res){
    res.redirect('/')
})

const port = process.env.PORT || 5000

app.listen(port, function() {
console.log("Servidor Iniciado")

})



