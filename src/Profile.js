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
            <p><span className="profile-title">First Name:</span> {teacherInfo.first_name}</p>
            <p><span className="profile-title">Last Name:</span> {teacherInfo.last_name}</p>
            <p><span className="profile-title">Email Address:</span> {teacherInfo.email}</p>
              {
                teacherInfo.classes ?
                <div className="class-list">
                  <p><span className="profile-title">Classes: </span></p>
                  <ul className="subject-class"> {
                    teacherInfo.classes.map((subject, index) => {
                      return (
                        <li key={index}>
                          <p>{subject.class}</p>
                        </li>
                      )
                    })
                  }
                  </ul>
                </div>  :
                  
                null
              }
          </div>
        </div> :
        null
      }
    </div>
  )
}

export default Profile;