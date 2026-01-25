//ASSIGNMENT 5: 
//-------------
//Bank Transaction Analyzer
//
//You are building a bank statement summary.
//
//Test data:
//const transactions = [
//  { id: 1, type: "credit", amount: 5000 },
//  { id: 2, type: "debit", amount: 2000 },
//  { id: 3, type: "credit", amount: 10000 },
//  { id: 4, type: "debit", amount: 3000 }
//];
//
//
//Tasks:
//    1. filter() all credit transactions
//    2. map() to extract only transaction amounts
//    3. reduce() to calculate final account balance
//    4. find() the first debit transaction
//    5. findIndex() of transaction with amount 10000

const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];

let r1=transactions.filter((transaction)=>transaction.type=="credit")
console.log(r1);

let r2=transactions.map((transaction)=>{
    return transaction.amount
})
console.log(r2);


let r3=transactions.reduce((accumulator,transaction)=>{
    if(transaction.type=="credit"){
        return accumulator+transaction.amount
    }
    else{
        return accumulator-transaction.amount
    }
},0)
console.log(r3);



let r4=transactions.find((transaction)=>transaction.type=="debit")
console.log(r4);

let r5=transactions.findIndex((transaction)=>transaction.amount==10000)
console.log(r5);
