import React from "react";
import avatar from "./assets/pngegg.png"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";



const Profile = () => {

  const info = useParams();

  const [ teacherInfo, setTeacherInfo ] = useState(null);
  const [ allTeachers, setAllTeachers ] = useState([]);
  
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
      setAllTeachers(data)
    })
  }, [info.id]);

  return (
    <div className="teacher-profile" tabIndex="0">
      <Link className="icon home" to={`/`}><FontAwesomeIcon icon={faHome} /></Link>
      {
        teacherInfo ?
        <div className="teacher-card">
          <div>
            {
              teacherInfo.id === 1 ?
              null :
              <Link className="icon" to={`/profile/${teacherInfo.id-1}`}><FontAwesomeIcon icon={faChevronLeft}/></Link>
            }
          </div>
          <div className="teacher-card-data">
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
                            {subject.class}
                          </li>
                        )
                      })
                    }
                    </ul>
                  </div>  :                
                  null
                }
            </div>
          </div>
          <div>
            {
              teacherInfo.id === allTeachers.length ?
              null :
              <Link className="icon" to={`/profile/${teacherInfo.id+1}`}><FontAwesomeIcon icon={faChevronRight}/></Link>
            }
          </div>
        </div> :
        null
      }
    </div>
  )
}

export default Profile;