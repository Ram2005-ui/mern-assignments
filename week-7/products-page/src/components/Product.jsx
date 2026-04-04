import React from "react";


function Product(props){
    let {name,brand,description,price,image}=props.product;
    return(
        <div className="bg-white rounded-2xl py-5 flex flex-col items-center">
            <img src={image} alt={name} className="m-2 h-40"/>
            <p className="font-bold text-2xl m-2">{name}</p>
            <p className="text-amber-300 m-2">{brand}</p>
            <p className="text-black m-2">{description}</p>
            <p className="text-blue-600 px-9">${price}</p>
            
        </div>

    )
}

export default Product