import React, { useContext, useState } from "react"
import { GoArchive } from "react-icons/go";
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { Context } from "../../context/Context"
import axios from "axios"
import { Link } from "react-router-dom"

export const User = () => {
  const { user, dispatch } = useContext(Context)


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  const [profileOpen, setProfileOpen] = useState(true)
  const close = () => {
    setProfileOpen(true)
  }

  const PublicFlo = "http://localhost:5000/images/"

  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src={PublicFlo + user.profilePic} alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to={"/account"}>
                  <div className='image'>
                    <div className='img'>
                      <img src={PublicFlo + user.profilePic} alt='' />
                    </div>
                    <div className='text'>
                      <h4>{user.username}</h4>
                      <label>Los Angeles, CA</label>
                    </div>
                  </div>
                </Link>
                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to={`/?user=${user.username}`}>
                  <button className='box'>
                    <GoArchive className='icon' />
                    <h4>My Account</h4>
                  </button>
                </Link>
                {/* <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button>
                <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button> */}
                {user.username === "admin123" && (
                  //'/admin'
                  <Link to={'/admin'}>
                  <button className='box'>
                    <GoArchive className='icon' />
                    <h4>Admin</h4>
                  </button>
                </Link>
                )}
                <button className='box' onClick={handleLogout}>
                  <BiLogOut className='icon' />
                  {user && <h4>Log Out</h4>}
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to='/login'>
            <button>My Account</button>
          </Link>
        )}
      </div>
    </>
  )
}
