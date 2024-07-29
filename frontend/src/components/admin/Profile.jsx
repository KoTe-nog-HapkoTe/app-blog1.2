import React, { useState, useContext, useEffect } from "react"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai"
import { Link } from "react-router-dom"
import axios from "axios"
import { Context } from "../../context/Context"


export const Profile = ({profile}) => {

    const { user } = useContext(Context)

    const handleDelete = async (userId) => {
        try {
          await axios.delete(`/users/${userId}`, { data: { username: user.username } })
          window.location.replace("/admin")
        } catch (error) {
            console.error(error.message)
        }
      }

    return(
    <>
        <section className="blog">
            <div className="container grid3">
            {profile.map((item) => (
                <div className="box boxItems" key={item.id}>
                    <div className="details">
                        {/* {item.username}
                        {item.email}
                        {item.password} */}
                        <p>
                        <Link to={`/?user=${item.username}`}>{item.username}</Link>
                        </p>
                        <p>
                        {item._id}
                        </p>
                        <button className='button' onClick={() => handleDelete(item._id)}> delite </button>
                    </div>
                </div>
            ))}
            </div>
      </section>
    </>
    )
}