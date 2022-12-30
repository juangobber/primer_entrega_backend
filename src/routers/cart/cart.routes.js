const {Router} = require('express');

const router = Router();

const cartManagment = require('../../cartManager')
const carrito = new cartManagment('./carrito.json')

const productManagment = require('../../ProductManager')
const productos = new productManagment('./listadoProductos.json')


//Routes
router.post('/', async (req, res)=>{
    res.send(await carrito.createCart())
});

router.get('/:cid', async (req, res)=> {
    res.send(await carrito.getProductsByCartId(+req.params.cid))
});

router.post('/:cid/product/:pid', async (req,res)=>{
    const {productExists} = await productos.getProductById(+req.params.pid)
    if (productExists){
        res.json(await carrito.addProductToCartById(+req.params.pid, +req.params.cid))
    }
    else {
        res.send("El producto no existe")
    }
    
})

module.exports = router;