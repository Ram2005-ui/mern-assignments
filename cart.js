//ii. cart.js - Shopping cart operations
//                          import { getProductById, checkStock } from './product.js';
import { getProductById, checkStock ,getAllProducts} from './product.js';

//                          
//                          let cartItems = [];
let cartItems = [];
//                          
//                          // TODO: Implement these functions
//                          
//                          export function addToCart(productId, quantity) {
//                            // 1. Get product details
//                            // 2. Check stock availability
//                            // 3. Check if product already in cart
//                            //    - If yes, update quantity
//                            //    - If no, add new item
//                            // 4. Return success/error message
//                          }
  export function addToCart(productId, quantity) {
    const product=getProductById(productId) //because we need to get the product details product is of object type
    if(!product){
        return "product not found"
    }
    if(!checkStock(productId, quantity)){  //for checking the availability first return if not available
        return "stock not available"
    }

    const existingItem=cartItems.find((item)=>item.id===productId)
    if(existingItem){
        cartItems=cartItems.map((item)=>{ //for updating the quantity
            if(item.id===productId){ //assigning back to cartItems is extremely crucial because otherwise map will create an new array which will be unrelated to cartItems
                return {...item,quantity:item.quantity+quantity}
            }
            return item
        })
        return "item updated successfully"
    }else{
        cartItems.push({...product,quantity:quantity}) //since we already have product details inside product variable we can use it here
        return "item added to cart successfully"
    }     
  }
  
//                          
//                          export function removeFromCart(productId) {
//                            // Remove product from cart
//                          }
export function removeFromCart(productId) {
    cartItems=cartItems.filter((item) => item.id !== productId); //it is important to assign the updated cartItems to cartItems otherwise the cartItems will be remain unchanged
    return cartItems;
                         
 }
//                          
//                          export function updateQuantity(productId, newQuantity) {
//                            // Update quantity of product in cart
//                            // Check stock before updating
//                          }
export function updateQuantity(productId, newQuantity) {
    if (checkStock(productId, newQuantity)) {
    cartItems=cartItems.map((item) => {
        if (item.id === productId) {
            return { ...item, quantity: newQuantity };
        }
        return item;
    });
    return cartItems;
    }else{
        return "stock not available"
    }
    
                          
 }
//                          
//                          export function getCartItems() {
//                            // Return all cart items with product details
//                          }
export function getCartItems() {
    return cartItems;
                          
 }
//                          
//                          export function getCartTotal() {
//                            // Calculate total price of all items in cart
//                            // Return total
//                          }
export function getCartTotal() {
    return cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
                          
 }
//                          
//                          export function clearCart() {
//                            // Empty the cart
//                          }
export function clearCart() { //return [] does nothing instead carttimes is made empty
    cartItems = [];
    return cartItems;
                          
 }
