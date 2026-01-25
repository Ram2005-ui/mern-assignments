//Hands-On 1: Shallow Copy (Controlled Mutation Use Case)
//-------------------------------------------------------
//🧪 Given Data:
//              const user = {
//                id: 101,
//                name: "Ravi",
//                preferences: {
//                  theme: "dark",
//                  language: "en"
//                }
//              };
//
//🎯 Task
//    1. Create a shallow copy of user
const user = {
                id: 101,
                name: "Ravi",
                preferences: {
                  theme: "dark",
                  language: "en"
                }
              };
const copiedUser={...user}  //shallow copy

console.log(user)
console.log(copiedUser) 
//    2. Change:
//          i. name in the copied object
//          ii. preferences.theme in the copied object
//          iii .Log both original and copied objects
//          iv. Observe what changes and what doesn’t

copiedUser.name="Anjali"
copiedUser.preferences.theme="light"
console.log(user)
console.log(copiedUser)

// when we change theme to light in copiedUser , it also changes in original user object because preferences is an object and in shallow copy only the reference is copied not the actual object. Hence both original and copied objects point to the same preferences object.


//
//
//
//
//
//
//
//
//
//
//
//Hands-On 2: Deep Copy (Isolation & Safety Use Case)
//---------------------------------------------------
//
//🧪 Given Data:
//                const order = {
//                  orderId: "ORD1001",
//                  customer: {
//                    name: "Anita",
//                    address: {
//                      city: "Hyderabad",
//                      pincode: 500085
//                    }
//                  },
//                  items: [
//                    { product: "Laptop", price: 70000 }
//                  ]
//                };
//
//🎯 Task:
//      1. Create a deep copy of order
const order = {
                  orderId: "ORD1001",
                  customer: {
                    name: "Anita",
                    address: {
                      city: "Hyderabad",
                      pincode: 500085
                    }
                  },
                  items: [
                    { product: "Laptop", price: 70000 }
                  ]
                };
const deepcopy=structuredClone(order)  //deep copy

console.log(order)
console.log(deepcopy)                
//      2. Modify in copied object:
//            i. customer.address.city
//            ii. items[0].price
//            iii. Verify original object remains unchanged

deepcopy.customer.address.city="Chennai"
deepcopy.items[0].price=60000
console.log(order)
console.log(deepcopy)

            
              
