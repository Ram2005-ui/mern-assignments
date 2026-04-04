//Assignment 1

const user = {
  id: 101,
  name: "Ravi",
  email: "ravi@gmail.com",
  role: "student",
  isActive: true
};
console.log(user.name)
console.log(user.email)
user.lastLogin="2026-01-01"
console.log(user)
user.role="admin"
console.log(user)
delete user.isActive
console.log(Object.keys(user))


//Assignment 2

const marks = {
  maths: 78,
  physics: 65,
  chemistry: 82,
  english: 55
};
let total=marks.maths+marks.physics+marks.chemistry+marks.english
console.log(total)
let avg=total/4  
//how to dynamically calculate number of properties in marks object

console.log(avg)
function maximum(obj){
    let maxi=0
    let key=""
    for(let i in obj){ 
         //important thing in objects is using for...in loop to iterate through properties
         //why obj[i] instead of obj.i because i is variable which holds key names one by one
         //when to use obj[i] and when to use obj.i 

        if(obj[i]>maxi){
            maxi=obj[i]
            key=i
        }
    }
    //return key with highest value
    return key
}

console.log(maximum(marks))
marks.computer=90
console.log(marks)


//Assignment 3: Application Settings Controller
//---------------------------------------------
//Scenario : A web app stores user preferences as settings.
//
//Test data:
//const settings = {
//  theme: "light",
//  notifications: true,
//  autoSave: false,
//  language: "en"
//};
//
//
//Tasks :
//    1.Toggle theme between "light" and "dark"
//    2. Turn autoSave to true
//    3. Remove the notifications setting
//    4. Freeze the settings object so it cannot be modified




const settings = {
    theme: "light",
    notifications: true,
    autoSave: false,
    language: "en"
};

function toggleTheme(obj){
    if(obj.theme==="light"){
        obj.theme="dark"
    }
    else{
        obj.theme="light"
    }
    return obj
}
console.log(toggleTheme(settings))
settings.autoSave=true
console.log(settings)

delete settings.notifications
console.log(settings)
Object.freeze(settings)
console.log(settings)
