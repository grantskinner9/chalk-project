import React from "react";
import avatar from "./assets/pngegg.png"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {

  const info = useParams();

  const [ teacherInfo, setTeacherInfo ] = useState(null);
  
  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].avatar === null) {
          data[i].avatar = avatar;
        }
        if (data[i].id == info.id) {
          setTeacherInfo(data[i]);
          break;
        }
      }
    })
  }, [info.id])


  return (
    <div className="teacher-profile">
      {
        teacherInfo ?
        <div className="teacher-card">
          <div className="profile-image-section">
            <img src={teacherInfo.avatar} alt={`${teacherInfo.first_name} ${teacherInfo.last_name}`} />
          </div>
          <div className="profile-text-section">
            <p>First Name: {teacherInfo.first_name}</p>
            <p>Last Name: {teacherInfo.last_name}</p>
            <p>Email Address: {teacherInfo.email}</p>
            <ul>
              {
                teacherInfo.classes ?
                teacherInfo.classes.map((subject, index) => {
                  return (
                    <li key={index}>
                      <p>{subject.class}</p>
                    </li>
                  )
                }) :
                null
              }
            </ul>
          </div>
        </div> :
        null
      }
    </div>
  )
}

export default Profile;