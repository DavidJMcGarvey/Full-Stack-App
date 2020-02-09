import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticaedUser') || null
  }

  constructor() {
    super();
    this.data = new Data()
  }

  render() {
    const { authenticaedUser } = this.state;
    const value = {
      authenticaedUser,
      data: this.data,
      actions: {
        signin: this.signIn,
        sighnout: this.signOut
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user != null) {
      this.setState(() => {
        return {
          authenticatedUser: user
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState(() => { 
      return {
        authenticatedUser: null 
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}


