const express=require("express")
const {Router}= express
const app= express()
const PORT=8080

app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.use(express.static('public'))

app.listen(PORT,()=>{
    console.log("Server activo en "+ PORT)
})

app.get('/public',(req,res)=>{
    res.sendFile( __dirname + "./public/.index.html")
})


const routerProducto= new Router()
const router=new Router()


routerProducto.post('/',(req,res) => {
    const data= req.body
    res.send('grabado')
})


app.use('/producto',routerProducto)
app.use("/api/",router)

