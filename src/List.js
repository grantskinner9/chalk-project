import React from "react";
import { Link } from 'react-router-dom';

const List = (props) => {

  return (
    <ul>
      {
        props.data ?
        props.data.map((teacher, index) => {
          return(
            <li key={index} className="teacher-display">
              <Link to={`/profile/${teacher.id}`}>
                {
                  teacher.avatar ?
                  <img src={teacher.avatar} alt={`${teacher.first_name} ${teacher.last_name}`} /> :
                  null
                }
                <p>{teacher.first_name} {teacher.last_name}</p>
                <p>{teacher.email}</p>
              </Link>
            </li>
          )
        }) :
        null
      }
    </ul>
  )
}

export default List;