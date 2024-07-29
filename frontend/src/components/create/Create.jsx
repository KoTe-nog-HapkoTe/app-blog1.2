import React, { useEffect, useRef } from "react"
import "./create.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"
import { Choose } from "./Choose"
import ImageUploader from "./ImageUploader"

export const Create = () => {

  
  //----------------pints---------------------
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/prints');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('data', error);
      }
    };
    
    fetchPhotos();
  }, []);
  //-------------------------back-----------------------------
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)

  const fileInputRef = useRef(null);

  const handleFileChange = (newFile) => {
    setFile(newFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      username: user.username,
      title,
      desc,
      file,
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename

      try {
        await axios.post("/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.post("/posts", newPost)
      window.location.replace("/post/" + res.data._id)
    } catch (error) {}
  }

  
  //-------------------------back-----------------------------

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img '>{file && <img src={URL.createObjectURL(file)} alt='images' />}</div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <label htmlFor='inputfile'>
                <IoIosAddCircleOutline />
              </label>
              <input type='file' id='inputfile' ref={fileInputRef} style={{ display: "none" }} onChange={(e) => handleFileChange(e.target.files[0])}  />
            </div>
            <ImageUploader setFile={handleFileChange} />
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            <textarea name='' id='text' cols='30' rows='10' onChange={(e) => setDesc(e.target.value)}></textarea>
            <button className='button'>Create Post</button>


            <div className="slides">
                {photos.map((photo) => (
                  <Choose {...photo} />
                ))}
            </div>
            
          </form>
        </div>
      </section>
      
    </>
  )
}
