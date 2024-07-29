import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const Forgot = () => {
  const [password,setPassword] = useState();
  const [passworda,setPassworda] = useState();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_a9i7a8l', 'template_35fzo9b', form.current, '-qoI7RVsG-eH3SuDO')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
      <form ref={form} onSubmit={sendEmail}>
        
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Password*</label>
        <input type="text" name="user_name" onChange={(e) => setPassword(e.target.value)}  />
        <label>Password Again*</label>
        <input type="text" name="user_name" onChange={(e) => setPassworda(e.target.value)} />
        <input type="submit" value="Send" />
      </form>
      {(passworda !== password) && <span>Someting went wrong</span>}
    </>
  );
};

