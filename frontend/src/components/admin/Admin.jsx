import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { Profile } from "./Profile"

export const Admin = () => {
  const [profile, setProfile] = useState([])

  const { search } = useLocation()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/users" + search)
      setProfile(res.data)
    }
    fetchPost()
  }, [search])

  return (
    <>
      <Profile profile={profile}  />
    </>
  )
}
