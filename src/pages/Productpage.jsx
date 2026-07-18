//import React from 'react'

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
//import { Addtocart } from "../../../backenenend/controllers/Cartcontroller";
export const Productpage = () => {
  const [products, setproducts] = useState([]);
  //onst navigate = useNavigate()
  async function Loadproducts() {
    const res = await fetch("http://localhost:3001/api/auth/v2/get");
    const data = await res.json();
    console.log(data);
    setproducts(data);
  }

  useEffect(() => {
    Loadproducts();
  }, []);
  async function Addtocartt(productid) {
    const Userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const cart = await fetch("http://localhost:3001/api/auth/v4/cart", {
      method: "Post",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        Userid: Userid,
        Productid: productid,
      }),
    });
    const data = await cart.json();
    console.log(data);
  }

  return (
    <div className="h-full w-full flex justify-center items-center bg-white " >
    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 ">
      {products.map((product) => (
        <div className="w-100 h-80 bg-white border  rounded-2xl text-center hover:shadow-lg hover:scale-[1.02] transition-all  " key={product._id}>
          <img src={product.imageUrls}   className="h-48 w-full rounded-2xl shadow-2xl " />
          <h1 className="font-semibold ">{product.name}</h1>
          <h2 className="font-bold">{product.price} </h2>
          <div>
            <button onClick={()=>{ Addtocartt(product._id)}} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
  transition-all duration-500 ease-in-out
  hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40
  active:translate-y-0 " >Add to cart</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};
