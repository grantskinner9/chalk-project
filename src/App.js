import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './List';
import Profile from './Profile';
import avatar from './assets/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png';
import './styles/App.css'

function App() {

  const [ data, setData ] = useState([]);
  const [ searchData, setSearchData ] = useState([]);
  const [ userInput, setUserInput ] = useState('');


  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(teacher => {
        if(teacher.avatar === null) {
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
  

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }


  return (
    <Router>
      <form action="#" method="#" className="myForm" name="myForm">
      <label htmlFor="order"></label>
        <select name="order" id="order" onChange={handleOrder}>
            <option value disabled selected>SELECT ORDER</option>
            <option value="1">First Name ASC.</option>
            <option value="2">First Name DESC.</option>
            <option value="3">Last Name ASC.</option>
            <option value="4">Last Name DESC.</option>
        </select>
      </form>

      <form className="search-form">
        <label htmlFor="search"></label>
        <input type="text" className="search" placeholder="search" onChange={handleChange} value={userInput} />
      </form>

      <Route exact path="/"> 
        <List
        data={data}/>
      </ Route>

      <Route path="/profile/:id">
        <Profile 
        avatar={avatar}/>
      </Route>
     

    </Router>
  );
}

export default App;
