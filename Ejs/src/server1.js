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

const routerProductos= new Router()

const Contenedor= require('./contenedor.js')
let contenedor= new Contenedor('./src/productos.json')

routerProductos.get('/',(req,res)=>{ //trae todos los productos
    async function productostotales(){
        let prod = await contenedor.getAll()
        res.status(200).send(prod)
    }
    productostotales()
})

routerProductos.get('/:id',(req,res)=>{ //trae producto por id
    const {id} = req.params
    async function productoid(){
        let prod = await contenedor.getById(id)
        res.status(200).send(prod)
    }
    productoid()
})

app.get('/productos/add',(req,res)=>{ //html para guarda un producto nuevo
    res.sendFile(__dirname + '/files/form.html')
})

app.post('/productos/add',(req,res)=>{ //crea un producto
    const producto= req.body
    async function agregarproducto(){
        let prod = await contenedor.save(producto)
        res.status(200).send(prod)
    }
    agregarproducto()
})

app.get('/productos/replace',(req,res)=>{ //html para reemplazar un producto
    res.sendFile(__dirname + '/files/formreemplazar.html')
})

app.post('/productos/replace',(req,res)=>{ //reemplaza el producto
    const producto=req.body
    async function reemplazaproducto(){
    let prod = await contenedor.replaceById(producto)
    res.status(200).send(producto)
    }
    reemplazaproducto()
})

routerProductos.delete('/:id',(req,res)=>{ //borra segun id
    const {id}=req.params
    async function deleteproducto(){
        let prod = await contenedor.deleteById(id)
        res.status(200).send(`Borrado el ${id}`)
        }
     deleteproducto()
})

app.use('/productos',routerProductos)

