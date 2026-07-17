import { useState } from "react";


export function Address({tushar}){

  const [address,setaddress] = useState(
     {fullname:"",
      street:"",
      city:""
     })

  function onhandlechange(e){
   

    setaddress({...address,[e.target.name]:e.target.value})
       console.log(e.target.value)
   
  }
   function onhandle(){  
    
      console.log(address)
    
       tushar(address)
    
    
   }


/*return <div className="bg-amber-100 h-screen flex justify-center items-center">

   <div className="bg-amber-300 p-10 text-center ">
  <div className="py-2">
  <h1>Address</h1> </div>
<div className="py-2  border rounded">  <input  type="text" name="fullname" value={address.fullname} onChange={onhandlechange}  /></div> 
 <div  className="py-2 border rounded">  <input type="text" name="street" onChange={onhandlechange} value={address.street}  /> </div>
   <div className="py-2 border rounded"><input type="text"  name="city"   onChange={onhandlechange} value={address.city} /> </div>
   
   </div>
 
    <button onClick={onhandle}> submit address </button>

</div>
*/
  return (
    <div className="bg-amber-100 min-h-screen flex justify-center items-center px-4 py-8">
      <div className="bg-white w-full max-w-md sm:max-w-lg p-6 sm:p-10 rounded-2xl shadow-lg text-center">
        
        <div className="py-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4">
            Address
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="py-2">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={address.fullname}
              onChange={onhandlechange}
              className="w-full border border-amber-500 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-600 bg-white text-gray-800"
            />
          </div>

          <div className="py-2">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={onhandlechange}
              className="w-full border border-amber-500 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-600 bg-white text-gray-800"
            />
          </div>

          <div className="py-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={onhandlechange}
              className="w-full border border-amber-500 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-600 bg-white text-gray-800"
            />
          </div>
        </div>

        <button
          onClick={onhandle}
          className="mt-6 w-full sm:w-auto bg-amber-700 hover:bg-amber-800 active:scale-95 transition text-white font-semibold px-8 py-2.5 rounded-lg shadow-md"
        >
          Submit Address
        </button>
      </div>
    </div>
  );
}



