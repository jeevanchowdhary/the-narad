import "./Emailform.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Emailform = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_a4mig28",
                "template_doowg9f",
                form.current,
                "1TG0N-vPvnVdYFoFs"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log("message sent");
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };
    return (
        <div className="login wrap">
            <form ref={form} onSubmit={sendEmail}>
                <div className="h1">Contact us</div>
                <input
                    placeholder="Name"
                    id="name"
                    name="user_name"
                    type="text"
                />
                <input
                    pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                    placeholder="Email"
                    id="email"
                    type="email"
                    name="user_email"
                />
                <textarea
                    name="message"
                    id=""
                    rows="2"
                    placeholder="Enter your message"
                    type="textarea"
                ></textarea>
                <input value="Send" className="btn" type="submit" />
            </form>
        </div>
    );
};

export default Emailform;
