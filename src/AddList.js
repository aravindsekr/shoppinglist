import React, { Component } from 'react';
import './App.css';

class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        itemName: ''
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  addItem() {
    this.props.onAddButtonClicked(this.state.itemName);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        const val = e.target.value;
        this.setState({
            itemName: val
        }, () => {
            this.addItem();
        });
    }
  }

  inputChanged(e) {
    const val = e.target.value;
    this.setState({
        itemName: val
    });
  }

  render() {
    return (
      <div className="container gutter">
        <div className="row add-form">
            <input className="column-lg-10 add-input" onKeyPress={this.handleKeyPress} onChange={this.inputChanged} type="text" name="item" placeholder="Add your item"/>
            <button onClick={this.addItem} className="column-lg-2 plus-icon">+</button>
        </div>
      </div>
    );
  }
}

export default AddList;
