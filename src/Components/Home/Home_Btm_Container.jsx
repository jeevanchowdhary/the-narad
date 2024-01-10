import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "./Home_btm.css";

function Home_Btm_Container() {
    useEffect(() => {
        const sr = ScrollReveal({
            origin: "right",
            distance: "100px",
            duration: 1500,
            reset: true,
        });
        sr.reveal(".fstTxT", { delay: 500 });
        sr.reveal(".secTxT", { delay: 1000 });
        sr.reveal(".Reader", { delay: 800 });
        sr.reveal(".leader", { delay: 1800 });
    }, []);

    return (
        <div className="home-btn-container">
            <div className="home-btm-RtgText">
                <p className="fstTxT">
                    Let’s Tell
                    <span className="Reader">World</span>
                </p>
                <p className="secTxT">
                    Some Good  <span className="leader">Stories</span>
                </p>
            </div>
        </div>
    );
}

export default Home_Btm_Container;
