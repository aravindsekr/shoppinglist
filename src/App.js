import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddList from './AddList';
import DisplayList from './DisplayList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    }
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);
  }

  onAddButtonClicked(itemName) {
    this.setState(prevState => ({
        itemList: [...prevState.itemList, itemName]
      }
    ));
  }

  render() {
    return (
      <div className="App">
        <header className="fullwidth header bottom-spacer">
          <nav className="fullwidth header-nav">
            <ul className="container gutter header-nav-container">
              <li className="header-nav-brand">Shopping List</li>
            </ul>
          </nav>
        </header>

        <AddList onAddButtonClicked={this.onAddButtonClicked}/>

        <DisplayList items={this.state.itemList}/>

      </div>
    );
  }
}

export default App;
