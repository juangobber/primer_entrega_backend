const fs = require('fs/promises')

class CartManager{
    constructor(path){
        this.path = path
        this.fileExist()
    }

    async fileExist(){
        try {await fs.readFile(this.path)}
        catch{
         console.log(`Se creó un nuevo archivo de cart con la ruta "${this.path}"`)
         await fs.writeFile(this.path, JSON.stringify([]))
        } 
     }

    async createCart(){
        const fileRead = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(fileRead);
        const dataLength = data.length + 1

        const newCart = {
            id: dataLength,
            products: []
            }
            data.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(data))
        return "Se creó un nuevo carrito"
    }

    async getProductsByCartId(cartId){
        const fileRead = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(fileRead);

        const cartExists =  data.find(cart => cart.id === cartId) ?? false

        if (cartExists === false) {
            console.log("Not Found")
            const indexCart = false
            return {cartExists, data, indexCart}
        } 
        const cart = data.findIndex((cart) => cart.id === cartId)

        return data[cart].products
    }

}


module.exports = CartManager 