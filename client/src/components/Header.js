import React from 'react';

// Header component
const Header = () => {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav><span>Welcome Davey!</span><a className="signout" href="/">Sign Out</a></nav>
      </div>
    </div>
  )
}

export default Header;