import { useEffect, useState } from "react";
//import { Product } from "../../../backenenend/models/db1";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartitem } from "./atoms/counteratom";
export function Cart() {
  const token = localStorage.getItem("token");
  const [cart, setcart] = useRecoilState(cartitem);
  const [count, setcount] = useState();
  const Userid = localStorage.getItem("userid");

  const navigate = useNavigate();

  useEffect(() => {
    Loadproducts();
  }, []);

  async function Loadproducts() {
    try{
   // const carts = await fetch(
     // `http://localhost:3001/api/auth/v4/getcart/${Userid}`,
     const carts = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/v4/getcart/${Userid}`, 
     
     {
        method: "get",
        headers: {
          "content-type": "application/json",
          token: token,
        },
      },
    );
    const data = await carts.json();
    if(data){
    console.log(data);
    setcart(data.message);

    const total = data.message?.items?.reduce((acc, current) => {
      acc = acc + current.Productid.price * current.quantity;
      return  acc;
    }, 0);
    localStorage.setItem("cartcount", total);
    console.log(total);
    const counts = localStorage.getItem("cartcount");
    console.log("totalcount", counts);
    setcount(counts);
  }

    }catch(error){

   console.log(error)

    }
  }

  async function Updatequantity(Productid, actions) {
    const Userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

   // const res = await fetch("http://localhost:3001/api/auth/v4/update", {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/v4/update`,{
      method: "put",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        Userid: Userid,
        Productid: Productid,
        actions: actions,
      }),
    });

    const data = await res.json();
    console.log(data);
    Loadproducts();
  }

  async function Removeitem(Prouctid) {
    console.log(Prouctid)
    const Userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    //const item = await fetch("http://localhost:3001/api/auth/v4/remove", {
  const item = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/v4/remove`,{
      method: "delete",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        Userid: Userid,
        Productid: Prouctid,
      }),
    });
    const data = await item.json();
    console.log(data);
    Loadproducts();
  }

  function prcdtocart() {
    navigate("/order");
  }
  if (cart === null || !cart) {
    return <div> cad is empty</div>;
  }
  if(cart.items?.length === 0){
  return <div>
  <h1>cart is empty is</h1>

  </div>


  }
 /* return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto">
      <div className="w-250 bg-white shadow pl-25 rounded-2xl gap-10 ">
        {cart.items.map((x) => {
          if (!x) {
            // kuch render nahi hoga kyuki prodcid m kuch nahi h reach null ko skip kar deta
            return <h1>cart is empty</h1>;
          }
          return (
            <div
              key={x._id}
              className=" flex  w-200 rounded-2xl h-23 m-4 gap-15 px-10 border"
            >
              <img src={x.Productid.imageUrls} alt="no image" />
              <h1> {x.Productid.name}</h1>

              <h1>{x.quantity}</h1>

              <div>
                <button
                  onClick={function () {
                    Updatequantity(x.Productid._id, "increase");
                  }}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  onClick={function () {
                    Updatequantity(x.Productid._id, "decrease");
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  onClick={function () {
                    Removeitem(x._id);
                  }}
                >
                  remve
                </button>
              </div>
            </div>
          );
        })}
        <div>total amount :{count}</div>
        <button onClick={prcdtocart}>Procced to cart</button>
      </div>
    </div>
  );

*/

  return (
    <div className="w-full h-full grid justify-center place-items-center bg-[#F5F3F7] py-8">
      
      <div className="     bg-white shadow-lg rounded-2xl p-4  grid  place-items-center w-120 md:w-200 lg:w-250  gap-3 ">
        {cart.items?.map((x) => {
          if (!x) {
            // kuch render nahi hoga kyuki prodcid m kuch nahi h reach null ko skip kar deta
            return <h1>cart is empty</h1>;
          }
 
          return (
            <div
              key={x._id}
              className="flex items-center w-100 md:w-150 lg:w-200  h-20 rounded-2xl  gap-3 px-3 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <img
                src={x.Productid.imageUrls}
                alt="no image"
                className="w-14 h-14 rounded-xl object-cover bg-gray-100 "
              />
 
              <h1 className="flex-1 text-xl font-semibold text-gray-800 truncate ">
                {x.Productid.name}
              </h1>
 
              <h1 className="w-6 text-xl text-center  font-medium text-gray-700">
                {x.quantity}
              </h1>
 
              <div>
                <button
                  onClick={function () {
                    Updatequantity(x.Productid._id, "increase");
                  }}
                  className="w-7 h-7 rounded-full bg-gray-100 text-gray-800 font-bold text-sm hover:bg-gray-200 active:scale-90 transition"
                >
                  +
                </button>
              </div>
              <div>
                <button
                  onClick={function () {
                    Updatequantity(x.Productid._id, "decrease");
                  }}
                  className="w-7 h-7 text-lg rounded-full bg-gray-100 text-gray-800 font-bold  hover:bg-gray-200 active:scale-90 transition"
                >
                  -
                </button>
              </div>
              <div>
                <button
                  onClick={function () {
                    Removeitem(x._id);
                  }}
                  className="text-lg font-medium text-red-500 hover:text-red-600 hover:underline px-1"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
 
      {  count === "undefined" || count === undefined || !count || count === null ?(
        <div>
    card is empty

      </div>
      
      
      ):(<div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-200">
          <div className="text-xl  font-semibold text-gray-800">
            Total Amount :{count}
          </div>
          <button
            onClick={prcdtocart}
            className="bg-black text-white text-xl font-semibold px-4 py-2 rounded-xl hover:bg-gray-800 active:scale-95 transition"
          >
            Procced to cart
          </button>
        </div>
         )
         
         }

      </div>
     
    </div>
  );
}
 
   




