import { Divider } from "antd";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className=" bg-black p-4 flex flex-col gap-4 justify-center items-center nav-link">
     <div className="flex gap-4 nav-link">
        <NavLink to="/contact" className="text-white">
          Contact Us
        </NavLink>
        <p className="text-white">|</p>
        <NavLink to="/about" className="text-white">
          About Us
        </NavLink>
        <p className="text-white">|</p>
        <NavLink to="/policy" className="text-white">
          Privacy & Policy
        </NavLink>
      </div>
      <Divider className="text-white bg-white my-0" />
       <p className="text-white text-center">
        {" "}
        All rights reserved &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
