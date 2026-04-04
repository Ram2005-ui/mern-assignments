
function addToTotal(totalAmount,discount,gst){
    totalAmount+=500;
    totalAmount+=1200;
    totalAmount-=discount;
    totalAmount+=totalAmount*gst/100;
    return totalAmount;
}
Amount=addToTotal(0,200,18);
console.log(Amount);
