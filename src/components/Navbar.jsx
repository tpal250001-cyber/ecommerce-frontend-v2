import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@base-ui/react";
export function Navbar() {
  const navigate = useNavigate();

const token = localStorage.getItem("token");
  

  function logout() {
    localStorage.removeItem("token");
    navigate("/signin")
    
  }
  return (
    <div className=" sticky top-0 z-10 ">
      <div className="flex justify-between py-4 border-2 rounded h-25 bg-black  ">
        <div className="my-3 ">
          <Link to="/product" className="pl-5 text-white text-xl font-semibold">
            QUICK CART
          </Link>
        </div>

        <div className=" my-3 flex  ">
          <div className="">
            <Link to="/cart" className="px-8 text-white text-xl font-semibold">
              Cart
            </Link>
          </div>

          <div>
            { token== null ? (
              <span>
                <Link
                  to="/signup"
                  className="px-4 text-white text-xl font-semibold"
                >
                  Signup
                </Link>

                <Link
                  to="/signin"
                  className="px-4 text-white text-xl font-semibold"
                >
                  Signin
                </Link>
              </span>
            ) : (
              <span>
                <Button
                  onClick={logout}
                  className="text-white text-xl font-semibold outline sm"
                  
                >
                logout
                </Button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
