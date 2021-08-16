const express=require("express")
const {Router}= express
const app= express()
const PORT=8080

app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.use('/public',express.static('./src/files'))

app.listen(PORT,()=>{
    console.log("Server activo en "+ PORT)
})

const routerProducto= new Router()
const router=new Router()
const routerNuevoProducto= new Router()
const routerProductoId= new Router()
const routerReemplazo= new Router()
const routerEliminar= new Router()

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

routerNuevoProducto.get('/',(req,res)=>{
    res.sendFile(__dirname + '/files/form.html')
})

routerNuevoProducto.post('/',(req,res)=>{
    const producto= req.body
    async function agregarproducto(){
        let prod = await contenedor.save(producto)
        res.status(200).send(prod)
    }
    agregarproducto()
})

routerReemplazo.get('/',(req,res)=>{
    res.sendFile(__dirname + '/files/formreemplazar.html')
})

routerReemplazo.post('/',(req,res)=>{// no pude usar el metodo PUT ya que no existe dentro del FORM ACTION
    const producto=req.body
    async function reemplazaproducto(){
    let prod = await contenedor.replaceById(producto)
    res.status(200).send(producto)
    }
    reemplazaproducto()
})

routerEliminar.delete('/:id',(req,res)=>{
    const {id}=req.params
    async function deleteproducto(){
        let prod = await contenedor.deleteById(id)
        res.status(200).send(`Borrado el ${id}`)
        }
     deleteproducto()
})

app.use('/api/productos',routerProducto)
app.use('/api/productos',routerProductoId)
app.use('/api/agregar',routerNuevoProducto)
app.use('/api/reemplazar',routerReemplazo)
app.use('/api/eliminar',routerEliminar)

