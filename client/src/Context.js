import React, { Component } from 'react';
// import Cookies from 'js-cookie';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {

  // state = {
  //   authenticatedUser: Cookies.getJSON('authenticaedUser') || null
  // }


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
    // const authenticaedUser = this.state;
    const value = {
      courses: this.state.courses
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}


