import React, { useState, useContext, useEffect } from "react"
import "./blog.css"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai"
import { Link } from "react-router-dom"
import axios from "axios"
import { Context } from "../../context/Context"

export const Card = ({ posts }) => {
  const { user } = useContext(Context);

  const PublicFlo = "http://localhost:5000/images/";

  const [likes, setLikes] = useState({});
  const [isLikes, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = {};
      for (const post of posts) {
        const response = await axios.get(`/posts/${post._id}`);
        likesData[post._id] = response.data.likes;
      }
      setLikes(likesData);
    };

    fetchLikes();
  }, [posts]);

  const handleLikeClick = async (postId) => {
    if (isLikes){
      try {
        const response = await axios.put(`/posts/${postId}`, {
          username: user.username,
          likes: likes[postId] + 1, 
        });
  
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: response.data.likes,
        }));
      } catch (error) {
        console.error("Error updating likes", error.message);
      }
      setIsLiked(false)
    }
    else{
      try {
        const response = await axios.put(`/posts/${postId}`, {
          username: user.username,
          likes: Math.floor(likes[postId] / 10), 
        });
  
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: response.data.likes,
        }));
      } catch (error) {
        console.error("Error updating likes", error.message);
      }
      setIsLiked(true)
    }
    
  };

  return (
    <>
      <section className="blog">
        <div className="container grid3">
          {posts.map((item) => (
            <div className="box boxItems" key={item.id}>
              <div className="img">{item.photo && <img src={PublicFlo + item.photo} alt="" />}</div>
              <div className="details">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  {item.categories.map((c) => (
                    <a href="/" key={c.name}>#{c.name}</a>
                  ))}
                </div>
                <Link to={`/post/${item._id}`}>
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{" "}
                  <label htmlFor="">{new Date(item.createdAt).toDateString()}</label>
                  <AiOutlineHeart
                    className={`icon ${likes[item._id] > 0 ? "liked-icon" : ""}`}
                    onClick={() => handleLikeClick(item._id)}
                  />{" "}
                  <label htmlFor="">{String(likes[item._id]).length}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
