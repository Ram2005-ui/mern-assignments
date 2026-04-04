//iii. discount.js - Coupon and discount logic
//                          // Available coupons
//                          const coupons = {
//                            'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
//                            'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
//                            'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
//                          };

const coupons = {
                           'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
                           'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
                           'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
                         };
//                          
//                          // TODO: Implement these functions
//                          
//                          export function validateCoupon(couponCode, cartTotal, cartItems) {
//                            // 1. Check if coupon exists
//                            // 2. Check minimum amount requirement
//                            // 3. Check category requirement (if any)
//                            // Return { valid: true/false, message: '...' }
//                          }
export function validateCoupon(couponCode, cartTotal, cartItems) { //first we will check all the edge cases
    if(!coupons[couponCode]){ //edge case to check if coupon does not exist
        return{
            valid:false,
            message:"Coupon does not exist"  //messages should tell the user why it is not valid
        }
    }
    if(coupons[couponCode].minAmount>cartTotal){  //coupon cannot be applied if cartTotal is less than minAmount
        return{
            valid:false,
            message:"Minimum amount not met"

        }
    }
    if(coupons[couponCode].category){
        const isCategoryPresent=cartItems.some(item=>
            item.category===coupons[couponCode].category)
            if(!isCategoryPresent){
                return{
                    valid:false,
                    message:`Coupon valid only for ${coupons[couponCode].category} items`
                }
            }
            }
        return{
            valid:true,
            message:"Coupon applied successfully"
        }
    }

//                          
//                          export function calculateDiscount(couponCode, cartTotal) {
//                            // Calculate discount amount based on coupon type
//                            // Return discount amount
//                          }
export function calculateDiscount(couponCode, cartTotal) {
    let discount=0
    if(coupons[couponCode].type=="percentage"){
        discount=cartTotal*coupons[couponCode].value/100
    }
    else if(coupons[couponCode].type=="flat"){
        discount=coupons[couponCode].value
    }
    return discount
}
//                          
//                          export function applyDiscount(cartTotal, couponCode, cartItems) {
//                            // 1. Validate coupon
//                            // 2. If valid, calculate discount
//                            // 3. Return final amount and discount details
//                            // Return { 
//                            //   originalTotal: ..., 
//                            //   discount: ..., 
//                            //   finalTotal: ...,
//                            //   message: '...'
//                            // }
//                          }
export function applyDiscount(cartTotal, couponCode, cartItems){
    let validate=validateCoupon(couponCode,cartTotal,cartItems)
    if(validate.valid){
        let discount=calculateDiscount(couponCode,cartTotal)
        let finalTotal=cartTotal-discount
        return{
            originalTotal:cartTotal,
            discount:discount,
            finalTotal:finalTotal,
            message:validate.message
        }
    }
    else{  //even if the coupon is not valid we will return the original total and display the message
        return{
            originalTotal:cartTotal,
            discount:0,
            finalTotal:cartTotal,
            message:validate.message
    }
}
}
