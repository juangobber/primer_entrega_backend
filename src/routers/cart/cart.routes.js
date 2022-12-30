const {Router} = require('express');

const router = Router();

const cartManagment = require('../../cartManager')
const carrito = new cartManagment('./carrito.json')


//Routes
router.get('/', async (req, res)=>{
    res.send(await carrito.createCart())
});

router.get('/:cid', async (req, res)=> {
    res.send(await carrito.getProductsByCartId(+req.params.cid))
});


module.exports = router;