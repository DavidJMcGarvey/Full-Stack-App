import React, { Component }from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';
import axios from 'axios';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
// import withContext from './Context';

// const CoursesWithContext = withContext(Courses);

// export default () => (
//   <Router>
//     <Route path='/' component={CoursesWithContext} />
//   </Router>
// );

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/dave" component={Courses} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      
    )
  }

}

// function App() {
//   return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <ul>
          
    //     </ul>
    //   </header>
    // </div>
//   );
// }

export default App;
