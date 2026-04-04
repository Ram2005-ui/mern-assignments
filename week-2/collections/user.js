//MODULE-1 :USER PROCESSING ENGINE
//  -> Get only active users
//  -> Extract names of active users
//  -> Check if any admin exists
//  -> Find user by id
//  -> Deactivate a user immutably

const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false }
];

let activeUsers = users.filter((user) => user.active);  //or can be written as users.filter(user=>{if(user.active) return user})
console.log(activeUsers);

let activeUserNames = activeUsers.map((user) => user.name); //since we are taking only active users we do not have to check for active again
console.log(activeUserNames);

let adminExists = users.some((user) => user.role === "admin");// some checks if any user has admin role
console.log(adminExists);

let userById = users.find((user) => user.id === 2);
console.log(userById);

let deactivatedUser=users.map((user) => {if(user.name === "Ravi"){
    return {...user, active:false}
}
else{
    return user

} });

console.log(deactivatedUser);
