import React, { useState } from "react";
import "./Homestyle.css";
import Swiper from "./Swiper/Swiper";
import BooksScroll from "../Books/BooksScroll";
import BottomSection from "../BottomSection/BottomSection";
import Home_Btm_Container from "./Home_Btm_Container";
import HomeBooks from "./HomeBooksSec/HomeBooks";
function Home() {
    const [homebooks, setHomebooks] = useState([
        { className: "story1", title: "Mona", img: "story1.jpg" },
        { className: "story2", title: "The Little Star", img: "story2.jpg" },
        { className: "story3", title: "Brownie", img: "story3.jpg" },
        { className: "story4", title: "The Connection", img: "story4.jpg" },
        { className: "story5", title: "Art 0f Living", img: "story5.jpg" },
        { className: "story6", title: "Guns and Glory", img: "story6.jpg" },
    ]);
    return (
        <div className="Home-main">
            <div className="home-Imgslider">
                <Swiper />
            </div>
            <div className="HomeTopLine"></div>
            <div className="Home-Books">
                {homebooks?.map((item, index) => (
                    <div key={index}  className="bookscont">
                        <HomeBooks books={item} />
                    </div>
                ))}
            </div>
            <div className="HomeBtmline"></div>
            <div>
                <Home_Btm_Container />
            </div>
            <div className="homeBtmsection">
                <BottomSection />
            </div>

            <div className="homeText">
                <h1 className="homelogoName">The Narad</h1>
                <div className="hometextLine">
                    <p>
                        "Stories are a way to preserve one's self. To be
                        remembered. And to forget."
                    </p>
                </div>
                <div className="hometextwriter">
                    <p> – Valeria Luiselli, in 'Lost Children Archive</p>
                </div>
            </div>
        </div>
    );
}
export default Home;
