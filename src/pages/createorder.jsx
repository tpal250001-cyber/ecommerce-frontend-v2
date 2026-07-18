import { useState, useEffect } from "react";
//import axios from "axios";
import { Address } from "./Address";


export function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(true);
 // const [ datas, setdatas] = useState(null)
  const token = localStorage.getItem("token"); // ya jaha bhi tum token store karte ho
  const Userid = localStorage.getItem("userid")
  // Step 1: Page load hote hi cart fetch karo
  
  async function fetchCart() {
      
        // const carts = await fetch(`http://localhost:3001/api/auth/v4/getcart/${Userid}`,
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
    console.log(data);
    setCart(data.message);
    
  }
  
  useEffect(() => {
    fetchCart()
  
  }, []);

  // Step 2: Address form submit hote hi ye chalega
  async function handleAddressSubmit(address) {
    
      // Cart items ko Order schema ke format me convert karo
      const items = cart.items.map((item) => ({
        Productid: item.Productid._id,
        qty: item.quantity,
        price: item.Productid.price,
      }));

      // Total amount cart se calculate karo
      const totalamount = cart.items.reduce((acc, item) => {
        return acc + item.Productid.price * item.quantity;
      }, 0);
  console.log(items)
      // Order create karo (address ke saath)
      const  data  = await fetch(
        "http://localhost:3001/api/auth/v3/create",{
         
          method:"post",
         headers: { 
          "content-type": "application/json",
          token:token 
        } ,
          body: JSON.stringify({
         items: items,
          totalamount: totalamount,
          address:address
      }),


      } );
      console.log(data)
     const dataa = await data.json()
       console.log(dataa)
     console.log(dataa.order)
     console.log(dataa.razorpayorder)
     console.log(dataa.message,"tushfs")
  console.log(dataa.razorpayorder_signature)
    
   
      // Step 3: Razorpay checkout popup kholo
     const options = {

          key: import.meta.env.VITE_ROZARPAY_KEY_ID,
          amount:dataa.razorpayorder.amount,
          currency:"INR",
          name:"quick cart",
          description:"order payment",
          order_id:dataa.razorpayorder.id,
          
        handler: async function (response) {
          try {
            console.log(response)
        
            const verifyRes = await fetch(
              "http://localhost:3001/api/auth/v3/verify",
              {
                method: "post",
                headers: {
                  "content-type": "application/json",
                  token: token,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  Userid:Userid
                }),
              }
            );
            const verifyData = await verifyRes.json();
            console.log(verifyData);
          

            if (verifyRes.ok) {
              alert("Payment successful! Order placed.");
              // yaha navigate karo success page pe agar chaho
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.log(err);
            alert("Something went wrong during verification.");
          }
        },
        modal:{
      ondismiss:function(){

  alert("payment cancelled")
      }
    }
      , 
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };
   console.log(import.meta.env.VITE_ROZARPAY_KEY_ID)
      const rzp = new window.Razorpay(options);
      rzp.open();
      
  
  
     
  }
  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return (
      <>
      {showAddressForm && (
        <Address tushar={handleAddressSubmit} />
      )}
    </>
  );
}