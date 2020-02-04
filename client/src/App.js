import React, { Component }from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Switch
} from 'react-router-dom';
import './styles/global.css';
import axios from 'axios';

import Header from './components/Header';
import Courses from './components/Courses';
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
    this.state= {
      courses: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(res => {
        this.setState({
          courses: res.data.courses
        });
      }).catch(err => {
        console.log('Error fetching data from REST API', err)
      })
  }

  render() {
    return (
      <div>
        <Header />
        {/* <Courses /> */}
      </div>
      
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
