import React, { Component } from 'react';

export default class Error extends Component {
  render() {
    return (
      <div className="bounds">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
      </div>
    )
  }
}