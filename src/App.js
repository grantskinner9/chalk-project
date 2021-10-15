import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './List';
import Profile from './Profile';
import './styles/App.css'

function App() {

  const [ data, setData ] = useState(null);

  useEffect(() => {
    fetch('https://cdn.chalk.com/misc/sample_teachers.json?id=10')
    .then(response => response.json())
    .then(data => {
      setData(data)
    })
  }, [])

  const [ id, setId ] = useState(null)

  const info = (param) => {
    setId(param)
  }


  return (
    <Router>

      <Route exact path="/" render={() => 
        <List
        info={info}
        data={data}/>
      }/>

      <Route path="/profile/:id">
        <Profile 
        data={data}/>
      </Route>
     

    </Router>
  );
}

export default App;
