import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Narad_main.css";
import "./Home_btm.css";
import "./NavBtn.css";
import Swiper from "./home-iimgs/swiperImg";
import Home_Btm_Container from "../Components/Home/Home_Btm_Container";
import VideoPlayer from "./Books/Books_lft_NaradVdio";
function Narad_main() {
    return (
        <div className="main-container">
            <div className="navbar">
                <div className="nav-img">
                    <img src="the_narad_png.png" alt="" />
                </div>
                <div className="nav-link">
                    <ul className="link">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#books">Books</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div className="main">
                <div className="circle-css">
                    <div className="right_circle"></div>
                    <div className="left_circle"></div>
                </div>
                <section className="home" id="home">
                    <div className="home-img">
                        <Swiper />
                    </div>
                    <div className="home-logo">
                        <div className="slider-thumb"></div>
                        <Home_Btm_Container />
                    </div>
                </section>
                <section className="books" id="books">
                    <div className="books-outerline">
                        <div className="booksleft-Container">
                            <VideoPlayer />
                        </div>
                        <div className="booksright-Container">
                            <div>
                                <h3>Please LogIn </h3>
                                <button
                                    style={{ zIndex: "1", display: "flex" }}
                                    id="login-popup"
                                    className="login-popup"
                                    onClick={() => {
                                        LoginPopup();
                                        console.log("login");
                                    }}
                                >
                                    LogIn
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about" id="about"></section>
                <section className="contact" id="contact"></section>
            </div>
            <Outlet />
        </div>
    );
}

export default Narad_main;
