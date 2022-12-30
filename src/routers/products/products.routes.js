const {Router} = require('express');

const router = Router();

const productManagment = require('../../ProductManager')
const productos = new productManagment('./listadoProductos.json')

router.get('/', async (req, res) => {
    
    try{
        const products = await productos.getProducts()
        
        if (req.query.limit){
            res.json({
                state: "successfull",
                productos:products.slice(0,req.query.limit)
            })
        } else {
            res.json({
                state: "successful",
                productos: products
            })
        }
    }
    catch{res.send("hubo un error")
    } 
})

router.get('/:pid', async (req, res)=> {
    try {
    const requestedProduct = await productos.getProductById(+req.params.pid)
        if (requestedProduct.productExists === false) {
            res.json({
                state: "Error",
                message: "El producto no existe"
            })
        } else {
            res.json({
                state: "successful",
                product: requestedProduct.productExists
            })
        }
    }
    catch {
    res.send("hubo un error")
    }
})

router.post('/', async (req, res)=> {
    const newProduct = await req.body;
    res.json(await productos.addProduct(newProduct))
})

router.put('/:pid', async (req, res)=> {
    const updateProduct = await req.body
    res.send(await productos.updateProduct(+req.params.pid, updateProduct))
})

router.delete('/:pid', async(req, res) => {
    res.send( await productos.deleteProduct(+req.params.pid))
})


module.exports = router;
