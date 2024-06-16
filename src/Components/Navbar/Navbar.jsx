import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { database } from "../LoginPage/firebase";
import { signOut } from "firebase/auth";
import "./Navstyles.css";

function Navbar() {
    const [loggedin, setLoggedin] = useState(false);
    const signout = () => {
        signOut(database)
            .then(() => {
                // Successful sign-out
                alert("User signed out successfully");
                history("/");
            })
            .catch((error) => {
                // Handle sign-out errors
                console.error("Error signing out:", error.message);
            });
     };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(database, (user) => {
            setLoggedin(!!user); // Set loggedin state based on user authentication
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="Navbar">
            <div>
                <img className="nav-img" src="Logo.png" alt="" />
            </div>
            <div>
                <ul className="links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/books">Books</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {loggedin ? (
                        <li>
                            <Link to="/loginpage" onClick={signout}>Logout</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/loginpage">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
