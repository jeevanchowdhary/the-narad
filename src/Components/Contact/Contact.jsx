import React, { useState } from "react";
import "./contact.css";
import Emailform from "./Emailform";
import BottomSection from "../BottomSection/BottomSection";

function Contact() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="contact-main">
            <div className="contact-lft-cont">
                <img src="contactUs.png" alt="" className="contact-image" />
            </div>
            <div className="contact-rtg-cont">
                <Emailform className="email" />
            </div>
            <div>
                <BottomSection />
            </div>
        </div>
    );
}

export default Contact;
