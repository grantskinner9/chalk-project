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

  // useParams provides the parameters, which is equal to the teacher ID.
  const info = useParams();

  const [ teacherInfo, setTeacherInfo ] = useState(null);
  const [ allTeachers, setAllTeachers ] = useState([]);
  
  // On page load we fetch the teacher data.
  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json')
    .then(response => response.json())
    .then(data => {
      // We loop through data with for loop.  Used for loop as it allows us to break from the loop if needed.  We first attach our default avatar if no avatar is provided.
      for (let i = 0; i < data.length; i++) {
        if(data[i].avatar === null) {
          data[i].avatar = avatar;
        }
        // We then use our useParams Id, and match it with the ID of our data to determine the teacher on display.  When it finds the match, it sets the teachers info to state, and then it breaks from loop
        if (data[i].id === parseInt(info.id)) {
          setTeacherInfo(data[i]);
          break;
        }
      }
      // We then push the entire data to state.  This is info is used later on to help determine the amount of teacher in our array.
      setAllTeachers(data)
    })
  }, [info.id]);

  return (
    <div className="teacher-profile" tabIndex="0">
      {/* Links back home */}
      <Link className="icon home" to={`/`}><FontAwesomeIcon icon={faHome} /></Link>
       {/* Displays teacher info once data is fetched. */}
      {
        teacherInfo ?
        <div className="teacher-card">
          <div className="arrows">
            {/* If the teacher has an ID greater than one, it will display a back arrow icon to Link to previous teacher */}
            {
              teacherInfo.id === 1 ?
              null :
              <Link className="icon" to={`/profile/${teacherInfo.id-1}`}><FontAwesomeIcon icon={faChevronLeft}/></Link>
            }
          </div>
          <div className="teacher-card-data">
            {/* Display teacher avatar */}
            <div className="profile-image-section">
              <img src={teacherInfo.avatar} alt={`${teacherInfo.first_name} ${teacherInfo.last_name}`} />
            </div>
            {/* Display teacher info */}
            <div className="profile-text-section">
              <p><span className="profile-title">First Name:</span> {teacherInfo.first_name}</p>
              <p><span className="profile-title">Last Name:</span> {teacherInfo.last_name}</p>
              <p><span className="profile-title">Email Address:</span> {teacherInfo.email}</p>
                {
                  // If teacher has classes array, we map over array and display classes
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
          <div className="arrows">
            {/* If teacher on display isn't the last teacher in our teachers array, we display Right arrow icon to circulate to new teachers */}
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