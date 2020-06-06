import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import { makeStyles } from '@material-ui/core/styles';
import Avatars from './Avatars';

function Header() {

  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light shadow-2">
        <Link className="navbar-brand display-4" to="/">Chatty</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Avatars />
              <a href="false" className="nav-item nav-link mr-3">{auth().currentUser.email}</a>
              <Link className="nav-item nav-link mr-3" to="/chat"><i className="material-icons">question_answer</i></Link>
              <Link className="nav-item nav-link mr-3" to="/archive"><i className="material-icons">archive</i></Link>
              <a className="nav-link dropdown-toggle" href id="navbarDML" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">account_circle</i>
              </a>
              <div className="dropdown-menu dropdown-default">
                <a className="dropdown-item" href>Action</a>
                <a className="dropdown-item" href>Another action</a>
                <a className="dropdown-item" href>Something else here</a>
              </div>

              <Link className="nav-item nav-link mr-3"
                onClick={() => auth().signOut()}>
                <i className="material-icons">logout</i>
              </Link>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/login">Login</Link>
              <Link className="nav-item nav-link mr-3" to="/signup">Registrate</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;