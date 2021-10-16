import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = (props) => {

  const info = useParams();

  const [ teacherInfo, setTeacherInfo ] = useState(null);
  
  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].avatar === null) {
          data[i].avatar = props.avatar;
        }
        if (data[i].id == info.id) {
          setTeacherInfo(data[i]);
          break;
        }
      }
    })
  }, [info.id])

  console.log(teacherInfo)


  return (
    <div>
      {
        teacherInfo ?
        <div>
          <p>{teacherInfo.first_name} {teacherInfo.last_name}</p>
          <p>{teacherInfo.email}</p>
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
          <img src={teacherInfo.avatar} alt={`${teacherInfo.first_name} ${teacherInfo.last_name}`} />
        </div> :
        null
      }
    </div>
  )
}

export default Profile;