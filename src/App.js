import { useState, useEffect } from 'react';
import avatar from './assets/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png'
import './styles/App.css'

function App() {

  const [ data, setData ] = useState(null);

  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json')
    .then(response => response.json())
    .then(data => {
      setData(data)
    })
  }, [])


  return (
    <div className="App">
      {
        data ?
        data.map((teacher, index) => {
          console.log(teacher)
          return(
            <ul key={index} >
              <li className="teacher-display">
                {
                  teacher.avatar ?
                  <img src={teacher.avatar} alt={teacher.first_name} /> :
                  <img src={avatar} alt={teacher.first_name} />
                }
                <p>{teacher.first_name} {teacher.last_name}</p>
                <p>{teacher.email}</p>
              </li>
            </ul>
          )
        }) :
        null
      }
    </div>
  );
}

export default App;
