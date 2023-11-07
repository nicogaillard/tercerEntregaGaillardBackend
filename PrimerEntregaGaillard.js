class ProductManager {
    constructor(){
        this.products = []
    }
    getProducts(){
        return this.products
    }
    getProductById(idProduct){
        let product = this.products.find(el => el.id == idProduct)

        if(product){
            return product
        }else {
            return `Not Found`
        }
    }
    addProduct(title,description,price,thumbnail,code,stock){
        let idProduct = (this.getProducts()).length

        if(!title || !description || !price || !thumbnail || !code || !stock){
            return `All data is required`
        }

        let productCode = this.products.find(el => el.code === code)

        if(productCode){
            return `Code already exists`;
        }
        
        
        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ++idProduct
        }
        this.products.push(product)
        return this.products
    }
}

let productManager = new ProductManager()

let product = productManager.addProduct(`Manzana`, `Fruta`, 50, " ", `apple`, 5)
console.log(product);
let product2 = productManager.addProduct(`banana`, `Fruta`, 50 ," ", `apple`, 5)
//console.log(product2); Se repite el code 
let product3 = productManager.addProduct(`banana`, `Fruta`," ", `banana`, 5)
//console.log(product3); Falta cargar datos