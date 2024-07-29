import React, { useState, useContext, useEffect} from "react"
import "./blog.css"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { Context } from "../../context/Context"

export const Likes = (item) =>{

    const { user } = useContext(Context)
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
  
    const likedPost = () => {
      if (!isLiked) {
        setLikes(likes + 2);
        setIsLiked(true);
      } else {
        setLikes(likes - 2);
        setIsLiked(false);
      }
    } 
  
    const handleLikeClick = async (item) => {
      likedPost();
      console.log(likes)
  
      try {
        await axios.put(`/posts/${item._id}`, { username: user.username, likes: likes });
        console.error('likes', item.likes);
      } catch (error) {
        console.error('hueta2', error.message);
        console.error('hueta2', item._id);
      }
    };

    return(
        <>
        <div className="like">
          <label htmlFor=''> {likes} </label>
        </div>
        </>
    )
}