import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import { signin, signInWithGoogle } from "../helpers/auth";
import { db } from "../services/firebase";
import Header from "../components/Header";

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      signup(this.state.email, this.state.password)
        .then(data => {
          //guardar usuario
          db.ref("users").push({
            name: this.state.name,
            timestamp: Date.now(),
            uid: data.user.uid,
            email: data.user.email
          });
        })
        .catch(error => this.setState({ error: error.message }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      signInWithGoogle()
        .then(data => {
          db.ref("users").push({
            name: data.user.displayName,
            timestamp: Date.now(),
            uid: data.user.uid,
            email: data.user.email
          });
        })
        .catch(error => this.setState({ error: error.message }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="container">
        <Header />
        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
          <h1>
            Registrate en
          <Link className="title ml-2" to="/">Chatty</Link>
          </h1>
          <p className="lead">Rellena el formulario para crear una cuenta nueva.</p>
          <div className="form-group">
            <input className="form-control" placeholder="Nombre" name="name" onChange={this.handleChange} value={this.state.name}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div className="form-group">
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button className="btn btn-primary px-5" type="submit">Sign up</button>
          </div>
          <p>También pueder hacer login con uno de estos servicios</p>
          <button className="btn btn-light btn-outline-dark mr-2" type="button" onClick={this.googleSignIn}>
            <img alt="Google" title="Sign in with Google" className="img-buttons"
              src="https://assets.gitlab-static.net/assets/auth_buttons/google_64-9ab7462cd2115e11f80171018d8c39bd493fc375e83202fbb6d37a487ad01908.png" />
            Sign up Google
          </button>
          {/*<button className="btn btn-secondary" type="button" onClick={this.githubSignIn}>
            Sign up with GitHub
            </button>*/}
          <hr></hr>
          <p>¿Si ya tienes cuenta? <Link to="/login">Login</Link></p>
        </form>
      </div>
    )
  }
}
