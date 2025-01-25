import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container-fluid">
        
        <span className="navbar-brand mb-0 h1">Mi Contact List</span>

        
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </div>
		</nav>
	);
};
