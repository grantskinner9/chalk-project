import React from "react";
import { Link } from 'react-router-dom';

const List = (props) => {

  return (
    <ul className="wrapper teacher-list">
      {
        props.data ?
        props.data.map((teacher, index) => {
          return(
            <li key={index} className="teacher-display">
              <Link to={`/profile/${teacher.id}`}>
                {
                  teacher.avatar ?
                  <div className="image-container">
                    <img src={teacher.avatar} alt={`${teacher.first_name} ${teacher.last_name}`} />
                  </div> :
                  null
                }
                <div className="text-container">
                  <p>{teacher.first_name} {teacher.last_name}</p>
                  <p>{teacher.email}</p>
                </div>
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