var cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

//Tasks:
//    1. Use filter() to get only inStock products
//    2. Use map() to create a new array with:  { name, totalPrice }
//    3. Use reduce() to calculate grand total cart value
//    4. Use find() to get details of "Mouse"
//    5. Use findIndex() to find the position of "Keyboard"
let newArray = cart
  .filter(product => product.inStock)         //Super important
  .map(product => product.name);
console.log(newArray);
let totalPrice=0;
cart = cart.map((product) => {
    return{
        ...product,
        totalPrice: product.price * product.quantity
    }
});

console.log(cart);

let r6=cart.map((product)=>{
    return {
        name:product.name,
        totalPrice:product.price*product.quantity
    }
})
console.log(r6);

let r7=cart.reduce((accumulator,product)=>accumulator+product.price*product.quantity,0)
console.log(r7);


let r3=cart.reduce((accumulator,item)=>accumulator+(item.totalPrice),0)
console.log(r3);

let r4=cart.find((element)=>element.name=="Mouse")
console.log(r4);

let r5=cart.findIndex((product)=>product.name=="Keyboard")
console.log(r5);




    
