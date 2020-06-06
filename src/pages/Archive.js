import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Archive extends Component {
  render() {
    return (
      <div className="archive">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Mis mesajes archivados</h1>
              <p className="lead">La web para poder chatear con amigos y familia</p>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}