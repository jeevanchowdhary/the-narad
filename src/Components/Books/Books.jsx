import React from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import "./Books-style.css";
import BooksScroll from "./BooksScroll";
import BottomSection from "../BottomSection/BottomSection";
import { signOut } from "firebase/auth";
import { database } from "../LoginPage/firebase";
import { useNavigate } from "react-router-dom";

function Books() {
    const history = useNavigate();
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
            if (!user) {
                // User is not authenticated
                alert("Please sign up to access this page");
                // Redirect to the login page or another appropriate page
                history("/loginpage");
            }
        });

        return () => unsubscribe();
    }, [history]);

    return (
        <div className="booksMain">
                       <div className="booksbtm">
                <div className="booksbtmtext">
                    <div className="rtg-text">
                        <h1>Best Books Available Here</h1>
                    </div>
                </div>
                <div className="btm-scrol">
                    <BooksScroll />
                </div>
            </div>
            <div>
                <BottomSection />
            </div>
        </div>
    );
}

export default Books;
