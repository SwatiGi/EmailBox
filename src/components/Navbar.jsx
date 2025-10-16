import React from 'react'
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  return (
     <nav className="navbar bg-primary px-3">
  <div className="container-fluid d-flex align-items-center">
    <img
      src="swati.jpg"
      alt="logo"
      className="me-3 rounded-circle"
      style={{ width: "50px", height: "50px" }}
    />

    <div className="d-flex m-2 align-items-center flex-grow-1">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search..."
      />
      <FaSearch className="text-white fs-4" />
    </div>
  </div>
</nav>

  )
}

export default Navbar