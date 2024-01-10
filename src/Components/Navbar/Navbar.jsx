import React from "react";
import { Link } from "react-router-dom";
import "./Navstyles.css";

function Navbar() {
    return (
        <div className="Navbar">
            <div>
                <img className="nav-img" src="Logo.png" alt="" />
            </div>
            <div>
                <ul className="links">
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/books">Books</Link>
                    </li>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/loginpage">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
