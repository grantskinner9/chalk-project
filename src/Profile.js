import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = (props) => {

  const info = useParams();
  

  useEffect(() => {
    props.data.forEach(data => {
      if (data.id == info.id) {
        console.log(data)
      }
    })

  })

  return (
    // <p>{props.id.first_name} {}</p>
    <p>Grant</p>
  )
}

export default Profile;