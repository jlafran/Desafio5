const express=require("express")
const app= express()
const PORT=8080

app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.listen(PORT,()=>{
    console.log("Server activo en "+ PORT)
})

app.use('/public',express.static('./public'))

const Contenedor= require('./src/contenedor.js')
let contenedor= new Contenedor('./src/productos.json')

//guarda el producto
app.post('/productos',(req,res)=>{
    const producto= req.body
    async function agregarproducto(){
        let prod = await contenedor.save(producto)
        res.redirect('/')
    }
    agregarproducto()
})

//pug

app.set('views','./views')
app.set('view engine','pug')

//formulario en la ruta raiz

app.get('/',(req,res)=>{
    res.render('viewForm',{})
})

//vista de productos

app.get('/productos',(req,res)=>{ //trae todos los productos
    async function productostotales(){
        let productos = await contenedor.getAll()
        res.render('viewProducts',{productos})
    }
    productostotales()
})