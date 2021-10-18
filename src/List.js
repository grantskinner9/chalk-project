import React from "react";
import avatar from './assets/pngegg.png';
import Sort from "./Sort";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const List = () => {

  const [ data, setData ] = useState([]);
  const [ searchData, setSearchData ] = useState([]);
  const [ userInput, setUserInput ] = useState('');
  const [ displayTeacher, setDisplayTeacher ] = useState(12);

  console.log(data)

  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(teacher => {
        if (teacher.avatar === null) {
          teacher.avatar = avatar;
        }
      })
      setData(data);
      setSearchData(data);
    })
  }, []);

  useEffect(()=> {
    const searchedData = [...searchData];
    const search = searchedData.filter(names => {
      const regex = new RegExp(userInput, 'gi');
      return names.first_name.match(regex) || names.last_name.match(regex);
    })
    setData(search)
  }, [userInput, searchData])


  const showMore = () => {
    setDisplayTeacher(displayTeacher + 12);
  }

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleOrder = (e) => {
    const order = [...data];
    if (e.target.value === "1") {
      order.sort((a,b) => {
        return a.first_name.localeCompare(b.first_name);
      })
      setData(order)
    } else if (e.target.value === "2") {
      order.sort((a,b) => {
        return b.first_name.localeCompare(a.first_name);
      })
      setData(order)
    } else if (e.target.value === "3") {
      order.sort((a,b) => {
        return a.last_name.localeCompare(b.last_name);
      })
      setData(order)
    } else if (e.target.value === "4") {
      order.sort((a,b) => {
        return b.last_name.localeCompare(a.last_name);
      })
      setData(order)
    }
  }

  const list = data.slice(0, displayTeacher);

  return (
    <div className="app-list">
      <Sort
      userInput={userInput}
      handleOrder={handleOrder}
      handleChange={handleChange}
      />
      <ul className="wrapper teacher-list">
        {
          list ?
          list.map((teacher, index) => {
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
                    <p className="teacher-email">{teacher.email}</p>
                  </div>
                </Link>
              </li>
            )
          }) :
          null
        }
      </ul>
      <button className="show-more" onClick={showMore}>Show More</button>
    </div>
  )
}

export default List;