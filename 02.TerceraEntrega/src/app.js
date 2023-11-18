import express from 'express'
import ProductManager from "../managers/ProductManager.js"

const PORT = 8080
const path = './files/products.json'
const app = express()
const productManager = new ProductManager(path) 

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto :${PORT}`);
})

app.get('/products', async (req, res) =>{
    const products = await productManager.getProducts()

    let limit = req.query.limit

    let productsFilter = products.slice(0, limit)

    if(!productsFilter){
        return res.json(products)
    }
    res.json(productsFilter)

})

app.get('/products/:pid', async (req, res) => {
    const products = await productManager.getProducts()

    const pid = req.params.pid

    let productFinded = products.find(el => el.id == pid)

    if(!productFinded){
        return res.json(products)
    }
    res.json(productFinded)
    
})
