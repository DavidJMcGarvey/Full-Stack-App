import React, { Component } from 'react';
import './styles/global.css';
import axios from 'axios';

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
    console.log(this.state.courses);
    return (
    <div className="App">
      <ul>
        <li>
          <p>Davey!</p>
        </li>
      </ul>
    </div>
    );
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
