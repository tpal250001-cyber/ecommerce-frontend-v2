import { useState } from "react";

export function CreateProduct() {
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [image, setimage] = useState();
  const [price, setprice] = useState();
  const [category, setcategory] = useState();
  const [stock, setstock] = useState();

  const token = localStorage.getItem("token");

  async function handlesubmit() {
    try {
      //const response = await fetch("http://localhost:3001/api/auth/v2/create", {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/v2/create`,{ 

        method: "post",
         headers: { 
          "content-type": "application/json",
          token:token 
        } 
        ,
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
          category: category,
          imageUrls: image,

          stock: stock,
        }),
      });

      const data = await response.json();
      console.log(data.message);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <input
        type="text"
        name="name"
        onChange={(e) => {
          setname(e.target.value);
        }}
        className="border-2"
        placeholder="Name"
      />

      <input
        type="text"
        name="image"
        onChange={(e) => {
          setimage(e.target.value);
        }}
        className="border-2"
        placeholder="Image"
      />
      <input
        type="text"
        name="description"
        onChange={(e) => {
          setdescription(e.target.value);
        }}
        className="border-2"
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        onChange={(e) => {
          setprice(e.target.value);
        }}
        className="border-2"
        placeholder="Price"
      />
      <input
        type="text"
        name="category"
        onChange={(e) => {
          setcategory(e.target.value);
        }}
        className="border-2"
        placeholder="category"
      />

      <input
        type="text"
        name="stock"
        onChange={(e) => {
          setstock(e.target.value);
        }}
        className="border-2"
        placeholder="stock"
      />

      <button onClick={handlesubmit}> create product</button>
    </div>
  );
}
