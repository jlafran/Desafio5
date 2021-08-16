const fs=require('fs');

class Contenedor{
    constructor(path){
        this.path=path
        this.id=0
        this.productos = []
    }

    async save (producto){
        await this.getAll()
        this.id++
        this.productos.push({
            id: this.id,
            producto: producto,
        })
        try{
            await fs.promises.writeFile(this.path,JSON.stringify(this.productos))
            console.log('guardado con exito')
        }
        catch(err){
            console.log('Error al escribirlo')
        }
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
        const prod=[]
		try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				this.productos.map((producto) => {
					if (this.id < producto.id) {
                        prod.push(producto)
                        this.id = producto.id
                    }
				})
			}
		} catch (error) {
			return
		}
        return prod
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
        let prod
        try {
			const data = await fs.promises.readFile(this.path, 'utf-8')
			if (data) {
				this.productos = JSON.parse(data)
				this.productos.map((producto) => {
					if (producto.id == id)prod=producto
				})  
			}
		} catch (error) {
			return
		}
        return prod
    }
}
module.exports=Contenedor