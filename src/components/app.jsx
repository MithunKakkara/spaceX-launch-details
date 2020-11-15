import React, { Component } from 'react'
import Filter from './filter/filter'
import CardList from './card/cardList'
class App extends Component {
  render() {

    return (
      <div className = "container">
        <div className="header">
          <h1>SpaceX Launch Programs</h1>
        </div>
        <Filter />
        <CardList />
        <div className="footer">
          <p className="footer__dev-info">
            Developed by:<span className="footer__dev-name"> Mithun K</span>
          </p>
        </div>
      </div>
    );
  }
}
export default App
