import React from "react";
import "./BooksScroll.css";
import { useNavigate } from "react-router-dom";

function BooksScroll() {
    const history = useNavigate();

    const toflipbook = () => {
        history("/flipbook");
    };

    return (
        <div className="booksScroll">
            <img
                className="card"
                src="story1.jpg"
                alt=""
                onClick={toflipbook}
            />

            <img className="card" src="story2.jpg" alt="" onClick={toflipbook} />

            <img className="card" src="story3.jpg" alt="" onClick={toflipbook} />

            <img className="card" src="story4.jpg" alt="" onClick={toflipbook} />

            <img className="card" src="story5.jpg" alt="" onClick={toflipbook} />

            <img className="card" src="story6.jpg" alt="" onClick={toflipbook} />
        </div>
    );
}

export default BooksScroll;
