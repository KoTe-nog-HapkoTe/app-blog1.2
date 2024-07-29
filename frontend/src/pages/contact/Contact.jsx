import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { SiMaildotru } from "react-icons/si";
import { TbSend } from "react-icons/tb";
import "./contact.css"

export const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_iatb611', 'template_5bm0xjx', form.current, 'nbb7WK0brx1NOkcSA')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    return(
        <>
        <div className="links">
            <div className="link">
                <a href="">
                    <BsFacebook className='icon' />
                    <p> - plexmongodatabase</p>
                </a>
            </div>
            <div className="link">
                <a href="">
                    <SiMaildotru className='icon' />
                    <p> - plexmongodatabase@gmail.com </p>
                </a>
            </div>
            <div className="link">
                <a href="">
                    <AiFillTwitterCircle className='icon' />
                    <p>- plexmongodatabase </p>
                </a>
            </div>
            <div className="link">
                <a href="">
                    <TbSend className='icon' />
                    <p>- @LexaBeton </p>
                </a>
            </div>
        </div>
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
       
        </>
    )
}