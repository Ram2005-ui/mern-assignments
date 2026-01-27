//i. product.js - Product catalog
//                          // Product database (simulated)
//                          const products = [
//                            { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
//                            { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
//                            { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
//                            { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
//                            { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
//                          ];
const products = [
                         { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
                         { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
                         { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
                         { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
                         { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
                       ];
//                          
//                          // TODO: Implement these functions
//                          
//                          export function getProductById(id) {
//                            // Find and return product by ID
//                          }
export function getProductById(id) {
    return products.find((product) => product.id === id);
                          
 }
//                          
//                          export function getAllProducts() {
//                            // Return all products
//                          }
export function getAllProducts() {
    return products;
                          
 }
//                          
//                          export function getProductsByCategory(category) {
//                            // Filter products by category
//                          }
export function getProductsByCategory(category) {
    return products.filter((product) => product.category === category);
                          
 }
//                          
//                          export function searchProducts(query) {
//                            // Search products by name (case-insensitive)
//                          }
export function searchProducts(query) { //we will use filter to search products
    return products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));  //it returns a new array containing only the elements that match the query
                          
 }
//                          
//                          export function checkStock(productId, quantity) {
//                            // Check if product has enough stock
//                            // Return true/false
//                          }
export function checkStock(productId, quantity) {
    return products.some((product) => product.id === productId && product.stock >= quantity); //some() method is used to check if at least one element in the array passes the test implemented by the provided function
                          
 }
//                          
//                          export function reduceStock(productId, quantity) {
//                            // Reduce product stock after purchase
//                          }

   export function reduceStock(productId, quantity) {//or we can use forEach method products.forEach((product)=>{})
  const product = products.find(p => p.id === productId);
  if (product && product.stock >= quantity) {
    product.stock -= quantity;
  }
  return products;
}

                         


