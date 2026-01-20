let marks=[90,80,70,60];
let skills=["JavaScript","Python","C++","Java"];
let sum=0
for(let s of marks){
    sum+=s;
}
console.log(sum)
//write a function that receives marks array as argument and return small element
function smallest(marks){
    let mini=marks[0];
    for(let i of marks){
        if(i<mini){
            mini=i;
        }
    }
    return mini;
}
console.log(smallest(marks));
function findSkill(skills,skillName){
    for(let i=0;i<skills.length;i++){
        if(skills[i]==skillName){
            return i;
        }
    }
    return "Skill not found";
}
console.log(findSkill(skills,"Python"));
console.log(findSkill(skills,"Ruby"));