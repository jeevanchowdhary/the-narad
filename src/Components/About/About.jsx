import React, { useState } from "react";
import "./About-style.css";
import Member from "./Member";
import BottomSection from "../BottomSection/BottomSection";
function About() {
    const [user, setUser] = useState([
        { classname: "m1", name: "Vikas Sabbi", img: "vikas.jpg" },
        { classname: "m2", name: "Tanmay", img: "tanmay.jpg" },
        { classname: "m3", name: "Sireesh", img: "sireesh.jpg" },
    ]);
    return (
        <div className="About-mian">
            <div className="about-top">
                <h1 className="about-name">About us</h1>
            </div>
            <div className="about-log-container">
                <div className="about-logo">
                    <div className="slider-thumb"></div>
                    <img src="the_narad.png" alt="" className="About-img" />
                </div>
                <div className="about-topText">
                    <h4>
                        Welcome to Narad, where every story comes to life with a
                        personal touch. At Narad, we are pioneering the future
                        of storytelling by integrating cutting-edge artificial
                        intelligence with user-centric customization options.
                        Our platform offers unparalleled storytelling
                        experiences through tailored voices and avatars,
                        crafting a unique narrative journey for every user.
                    </h4>
                </div>
            </div>
            <div className="about2nd-cont">
                <div className="about2img-cont">
                    <img src="aboutimg1.jpg" alt="" className="aboutimg2" />
                </div>
                <div className="abouttext2">
                    <h1>Our Mission</h1>
                    <p>
                        We are driven by the belief that stories are not just
                        meant to be told—they're meant to be experienced. Our
                        mission is to transform the landscape of storytelling by
                        offering an interactive platform where users can engage
                        with content on a deeply personal level. Through our
                        AI-powered customization, we build a bridge of
                        connectivity between the narrative and the listener,
                        turning passive engagement into an interactive
                        adventure.
                    </p>
                </div>
            </div>
            <div className="about2nd-cont">
                <div className="abouttext2">
                    <h1>Our Vision</h1>
                    <p>
                        At Narad, we envision a world where technology brings
                        stories to the forefront of digital engagement,
                        fostering a new era of creativity and personal
                        expression. We aim to create a space where every voice
                        is heard and every character is as vivid as our users'
                        imaginations. By continually advancing our AI, we're
                        dedicated to evolving with our users, ensuring that each
                        story is as unique as the individual who creates it.
                    </p>
                </div>
                <div className="about2img-cont">
                    <img src="aboutimg2.jpg" alt="" className="aboutimg2" />
                </div>
            </div>
            <div className="about2nd-cont">
                <div className="about2img-cont">
                    <img src="aboutimg3.jpg" alt="" className="aboutimg2" />
                </div>
                <div className="abouttext2">
                    <h1>Our Platform</h1>
                    <p>
                        With Narad, users have the tools to craft their own
                        avatars and choose from a suite of custom voices, making
                        each story distinctly their own. Our state-of-the-art AI
                        ensures that each avatar connects on a human level,
                        offering expressions and interactions that resonate.
                        Whether it’s for education, entertainment, or personal
                        reflection, our platform offers a new way to experience
                        and create stories.
                    </p>
                </div>
            </div>
            <div className="about-ourteam">
                <div className="about-ourteamTop">
                    <h1>Our team</h1>
                </div>
                <div className="About-members">
                    {user?.map((item, index) => (
                        <div key={index} className={item.classname}>
                            <Member user={item} />
                        </div>
                    ))}
                </div>
                <div className="about-ourteam-text">
                    <p>
                        Our team is a collective of tech enthusiasts, creative
                        writers, designers, and engineers, all dedicated to
                        pushing the boundaries of AI and storytelling. We come
                        from diverse backgrounds but share a common passion for
                        innovation and the art of storytelling. Together, we
                        work to deliver an exceptional platform that meets the
                        needs of our users, enabling them to become the
                        narrators of their own adventures.
                    </p>
                </div>
                <div className="about-btm-text">
                    <p>
                        Join us on this thrilling venture to reimagine
                        storytelling. With Narad, your story is
                        just the beginning.
                    </p>
                </div>
                <div>
                    <BottomSection />
                </div>
            </div>
        </div>
    );
}

export default About;
