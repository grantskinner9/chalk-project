import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './List';
import Profile from './Profile';
import './styles/App.css'

function App() {

  return (
    <Router>
      <main>

        <Route exact path="/"> 
          <List/>
        </ Route>

        <Route path="/profile/:id">
          <Profile/>
        </Route>
      
      </main>
    </Router>
  );
}

export default App;
