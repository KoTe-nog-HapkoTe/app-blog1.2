import React from "react"
import { DiJsBadge } from "react-icons/di";
import { DiReact } from "react-icons/di";
import { DiCss3 } from "react-icons/di";
import { DiMongodb } from "react-icons/di";

export const Footer = () => {
  return (
    <>
      <footer >
        <div className='container flex'>
          <p>Mux/e Kng TpanukUwU -flex -cringe </p>
          <div className='social'>
            <DiJsBadge className='icon' />
            <DiReact className='icon' />
            <DiCss3 className='icon' />
            <DiMongodb className='icon' />
          </div>
        </div>
      </footer>
    </>
  )
}
