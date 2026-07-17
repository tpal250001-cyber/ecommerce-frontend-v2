import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Signin() {
  
  const navigate = useNavigate()
  const [form, setform] = useState({
    name: "",
    password: "",
  });
  function Handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }
  async function Onhandlesubmit(e) {
    console.log("tusha");
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/auth/v1/signin", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("userid", data.userid);
    console.log(data);
   navigate("/")
  }
  return (
    <>
    <section className="min h-screen flex items-center justify-center bg-red-200 ">
        <div className="bg-white w-100 space-y-2  h-80 rounded-2xl text-center ">
          <h1 className="mt-5">Welcome to Signup Page</h1>
          <input type="text"name="name" value={form.name} onChange={Handlechange} className="border-2 rounded w-80 pt-2 mt-5 " />
          <input  type="password" name="password" value={form.password} onChange={Handlechange} className="border-2 rounded  w-80"  />
          <button type="submit" onClick={Onhandlesubmit}  className="w-80 bg-blue-600 text-white" > button </button>
        </div>
      </section>
    </>
  );
}
