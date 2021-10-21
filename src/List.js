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

  // On page load, we fetch data.
  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json')
    .then(response => response.json())
    .then(data => {
      // Loop through teacher data.  If teacher data doesn't have an avatar, we provide it a default avatar photo that we import.
      data.forEach(teacher => {
        if (teacher.avatar === null) {
          teacher.avatar = avatar;
        }
      })
      // We then push this data into state.  We push it into two sets of state, one will be what is parsed through and displayed on screen, the other is used for searching function.
      setData(data);
      setSearchData(data);
    })
  }, []);

  // This renders when user types in search bar.
  useEffect(()=> {
    // Make copy of searchData array as to not manipulate state.
    const searchedData = [...searchData];
    // We filter through our array and return any words in which the first or last name match the user input
    const search = searchedData.filter(names => {
      const regex = new RegExp(userInput, 'gi');
      return names.first_name.match(regex) || names.last_name.match(regex);
    })
    // The search return gets pushed to state which rerenders the teachers displayed on screen
    setData(search)
  }, [userInput, searchData])

  // Runs on Click of Show More button.  This increases the number of teachers displayed by 12
  const showMore = () => {
    setDisplayTeacher(displayTeacher + 12);
  }

  // Handles our input value, and pushes to state
  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  // Function runs when user selects a sort option.  It will return a sort function based on user selection.  This gets pushed to state to render the new order.
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

  // We slice our teacher data and save it to "list" variable.  This variable is what is displayed to screen.  We start at 0, and go to the value of displayTeacher, which starts at 12, and increases when user clicks "Show More"
  const list = data.slice(0, displayTeacher);

  return (
    <div className="app-list">
      {/* Sort Component holds the forms for search and order select */}
      <Sort
      userInput={userInput}
      handleOrder={handleOrder}
      handleChange={handleChange}
      />
      <ul className="wrapper teacher-list">
        {/* We map through list array.  We display avatar, first & last name and email.  When user clicks, it Links to profile component. */}
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
      {/* Show More button.  On Click run the showMore function to display more teachers. */}
      <button className="show-more" onClick={showMore}>Show More</button>
    </div>
  )
}

export default List;