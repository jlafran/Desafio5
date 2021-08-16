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

const routerProducto= new Router()
const router=new Router()
const routerNuevoProducto= new Router()

const Contenedor= require('./contenedor.js')
let contenedor= new Contenedor('./src/productos.json')

routerProducto.get('/',(req,res)=>{
    async function productostotales(){
        let prod = await contenedor.getAll()
        res.send(prod)
    }
    productostotales()
})

routerProducto.get('/:id',(req,res)=>{
    async function productostotales(){
        let prod = await contenedor.getById(id)
        res.send(prod)
    }
    productostotales()
})

app.use('/api/productos',routerProducto)
app.use('/api/productos/:id',routerProducto)
app.use("/api/",router)
app.use('/agregar',routerNuevoProducto)

