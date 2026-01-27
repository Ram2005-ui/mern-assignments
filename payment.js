//iv. payment.js - Payment processing
//                          import { reduceStock } from './product.js';
//                          import { getCartItems, getCartTotal, clearCart } from './cart.js';
//                          import { applyDiscount } from './discount.js';
import { reduceStock } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';
//                          
//                          // TODO: Implement these functions
//                          
//                          export function processPayment(paymentMethod, couponCode = null) {
//                            // 1. Get cart items and total
//                            // 2. Apply discount if coupon provided
//                            // 3. Validate payment method (card/upi/cod)
//                            // 4. Process payment (simulate)
//                            // 5. Reduce stock for all items
//                            // 6. Clear cart
//                            // 7. Generate order summary
//                            
//                            // Return order summary:
//                            // {
//                            //   orderId: ...,
//                            //   items: [...],
//                            //   subtotal: ...,
//                            //   discount: ...,
//                            //   total: ...,
//                            //   paymentMethod: ...,
//                            //   status: 'success/failed',
//                            //   message: '...'
//                            // }
//                          }
export function processPayment(paymentMethod, couponCode = null) {
    const cartItems=getCartItems()
    const cartTotal=getCartTotal()
    let discount=0
    let subtotal=cartTotal  //because even if couponcode is not applied subtotal will be cartTotal
    let total=cartTotal
    if(couponCode){ //we dont need to validate coupon again since applydicount has already validated it
        let discresult=applyDiscount(cartTotal,couponCode,cartItems) //store the result of applyDiscount function in discresult variable
        total=discresult.finalTotal 
        discount=discresult.discount
    }
    if(paymentMethod!="cod" && paymentMethod!="upi" && paymentMethod!="card"){
        return{
            status:"failed",
            message:"Invalid payment method"
        }
    }
        const status = "success"
        const message = "Payment successful"
        cartItems.forEach(item=>{ //every cant be used since it checks if all the elements satisfy the condition
            reduceStock(item.id,item.quantity) //forEach does not return anything while every return true/false
        })
        clearCart()
        return{
            orderId:generateOrderId(),
            items:cartItems,
            subtotal:subtotal,
            discount:discount,
            total:total,
            paymentMethod:paymentMethod,
            status:status,
            message:message
        }
}
//                          
//                          export function validatePaymentMethod(method) {
//                            // Check if method is valid (card/upi/cod)
//                          }
export function validatePaymentMethod(method) {
    if(method=="cod" || method=="upi" || method=="card"){
        return true
    }
    else{
        return false
    }
}
//                          
//                          function generateOrderId() {
//                            // Generate random order ID
//                            return 'ORD' + Date.now();
//                          }
function generateOrderId() {
    return 'ORD' + Date.now();
}

