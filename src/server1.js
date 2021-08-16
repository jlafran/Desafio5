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
const routerProductoId= new Router()

const Contenedor= require('./contenedor.js')
let contenedor= new Contenedor('./src/productos.json')

routerProducto.get('/',(req,res)=>{
    async function productostotales(){
        let prod = await contenedor.getAll()
        res.status(200).send(prod)
    }
    productostotales()
})

routerProductoId.get('/:id',(req,res)=>{
    const {id} = req.params
    async function productoid(){
        let prod = await contenedor.getById(id)
        res.status(200).send(prod)
    }
    productoid()
})

app.use('/api/productos',routerProducto)
app.use('/api/productos',routerProductoId)
app.use("/api/",router)
app.use('/agregar',routerNuevoProducto)

