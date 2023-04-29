import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import colorContext from '../context/bgColor/colorContext';

const Navbar = (props) => {
  let location = useLocation();
  let history = useNavigate();
  const context = useContext(colorContext);
  const { mode, toggleMode } = context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
    props.showAlert("Logged Out Successfully", "success");
  }

  return (

    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          <div className={`form-check form-switch text-${mode === 'light' ? 'dark':'light'} mx-2`}>
            <input className="form-check-input" onClick={toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >Enable DarkMode</label>
          </div>
          {!localStorage.getItem("token") ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role='button'>Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role='button'>Sign Up</Link>
          </form> : <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
