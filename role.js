//MODULE 4: ROLE & PERMISSION ENGINE
//  -> Get all role names
//  -> Check if student can delete
//  -> Create a flat list of all unique permissions
//  -> Add new role moderator immutably

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};

let roleNames=Object.keys(roles) //to get keys
console.log(roleNames)

let candelete=roles.student.includes("delete")  //to check if student can delete
console.log(candelete)

let permissions=[... new Set(Object.values(roles).flat())] //to get unique and flat removes one level of nesting
console.log(permissions)

let newRole={
    ...roles,
    moderator:["update","delete"]
}
console.log(newRole)
