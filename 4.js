
function getResultMessage(isLoggedIn, isProfileComplete){
    if(!isLoggedIn){
    return("Please login");
}
else if(isLoggedIn && !isProfileComplete){
    return("Complete your profile");
}
else if(isLoggedIn && isProfileComplete){
    return("Welcome back!");
}


}

message=getResultMessage(true,false);
console.log(message);