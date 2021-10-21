import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from './List';
import Profile from './Profile';
import './styles/App.css'

function App() {

  return (
    <Router>
      <main>
        {/* Page opens on List Component on page load.  This displays all Teachers */}
        <Route exact path="/"> 
          <List/>
        </ Route>

        {/* Page routes to Profile Component when user clicks on teacher. */}
        <Route path="/profile/:id">
          <Profile/>
        </Route>
      
      </main>
    </Router>
  );
}

export default App;
