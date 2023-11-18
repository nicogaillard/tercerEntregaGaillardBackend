import { error } from 'console'
import fs from 'fs'


export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(data)
            return products
        } else {
            return []
        }
    }

    getProductById = async (idProduct) => {
        const products = await this.getProducts()

        let productById = products.find(el => el.id == idProduct)

        if (productById) {
            return productById
        } else {
            return 'error'
        }
    }

    addProduct = async ({ ...product }) => {
        const products = await this.getProducts()


        if (products.length === 0) {
            product.id = 1
        } else {
            product.id = products[products.length - 1].id + 1
        }

        products.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        return products
    }

    deleteProducts = async (id) => {
        let products = await this.getProducts()
        let productsFilter = products.filter(el => el.id != id)

        if (productsFilter == []) {
            return console.log('Error');
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null, '\t'))
        }
    }

    updateProduct = async ({ id, ...product }) => {
        await this.deleteProducts(id)

        let productOld = await this.getProducts()

        let productUpdated = [
            { ...product, id }, ...productOld
        ]

        await fs.promises.writeFile(this.path, JSON.stringify(productUpdated, null, '\t'))
    }

}