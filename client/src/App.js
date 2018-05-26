import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import logo from './logo.svg';
import './App.css';

import { gql } from 'apollo-boost';

import AddList from './AddList';

const addItemMutation = gql`
    mutation($name: String!, $description: String, $quantity: Int) {
       addItem(name: $name, description: $description, quantity: $quantity){
           name
           id
       }
    }
`;

const getItemsQuery = gql`
    {
      findAllItems {
          id
          name
          description
        }
    }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    }
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);
  }

  onAddButtonClicked(itemName) {
    this.props.addItemMutation({
      variables: {
          name: itemName
      },
      refetchQueries: [
        { query: getItemsQuery }
      ]
    });
  }

  displayItems() {
    var data = this.props.getItemsQuery;
    if(data.loading) {
          return (<li>Loading....</li>);
    } else {
        return data.findAllItems.map((item, index) => {
          return <li key={item.id} className="list-item">
                <span className="numbered">{index + 1}</span>
                <span>{item.name}</span>
                <small className="muted">{item.description}</small>
            </li>
        })
    }
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
        
        <div className="container gutter">
          <ul className="vertical-spacer">
            {this.displayItems()}
          </ul>
        </div>

      </div>
    );
  }
}

export default compose(
  graphql(getItemsQuery, { name: "getItemsQuery"}),
  graphql(addItemMutation, { name: "addItemMutation"})
)(App);
