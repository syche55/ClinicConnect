import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitRequest = async (e) => {
    e.preventDefault();
    console.log({ email, message });
    const response = await fetch("http://localhost:8000/access", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    });

    const resData = await response.json();
    if (resData.status === "success") {
      alert("Message Sent.");
      // this.resetForm()
      setEmail("");
      setMessage("");
    } else if (resData.status === "fail") {
      alert("Message failed to send.");
    }
  };

  return (
    <div className="footer-container">
      <section className="footer-contact">
        <p className="footer-contact-heading">
          2098 Walsh Ave Suite B, Santa Clara, CA 95050
        </p>
        <div>
          <form className="footer-form">
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <textarea
              className="footer-info"
              name="message"
              type="text"
              placeholder="Your Request"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
            />
            <div className="header-btn">
              <button type="button" type="submit" onClick={submitRequest}>
                Contact Us
              </button>
            </div>
          </form>
        </div>
        <div className="rights-inline">
          <small className="phone">Tel: 123-456-7890</small>
          <small className="website-rights">ClinicConnect © 2020 </small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
