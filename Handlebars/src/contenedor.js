const fs=require('fs');

class Contenedor{
    constructor(path){
        this.path=path
        this.id=0
        this.productos = []
    }

    async save (producto){
        let produc=[]
        await this.getAll()
        this.id++
        produc={
            id: this.id,
            producto: producto,
        }
        this.productos.push({
            id: this.id,
            producto: producto,
        })
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
            console.log('guardado con exito')
            return produc
        }
        catch(err){
            console.log('Error al escribirlo')
        }
    }

    async getAll() {
		try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				this.productos.map((producto) => {
					if (this.id < producto.id) {
                        this.id = producto.id
                    }
				})
			}
            return this.productos
		} catch (error) {
			return
		}
	}

    async deleteAll(){
        this.productos=[]
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
            console.log('Borrado con exito')
        }
        catch(err){
            console.log('Error al Borrarlo')
        }
    }

    async deleteById(id){
        await this.getAll()
        this.productos=this.productos.filter((producto)=> id!= producto.id )
        console.log(this.productos)
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
            console.log('El id fue eliminado con exito')
        }
        catch(err){
            console.log('Error al borrar el id')
        }
    }

    async getById(id){
        try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				return this.productos.find((producto)=>producto.id==id)
			}
		} catch (error) {
			return
		}
    }
    async replaceById(produc){
        try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				this.productos.filter((producto)=>producto.id==produc.id)
                    .forEach((producto) => {
                        producto.producto.title=produc.title
                        producto.producto.price=produc.price
                        producto.producto.url=produc.url
				    })
                try{
                    await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
                    console.log('guardado con exito')
                }
                catch(err){
                    console.log('Error al escribirlo')
                }
                return this.productos.find((producto)=>producto.id==produc.id)
			}
		} catch (error) {
			return
		}
    }
}
module.exports=Contenedor