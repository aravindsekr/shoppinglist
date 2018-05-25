import React, { Component } from 'react';
import './App.css';

class DisplayList extends Component {
  render() {
    return (
      <div className="container gutter">
        <ul className="vertical-spacer">
            {this.props.items.map((item, index) => {
                return (
                    <li key={index} className="list-item">
                        <span className="numbered">{index + 1}</span>
                        <span>{item}</span>
                    </li>
                );
            })}
        </ul>
      </div>
    );
  }
}

export default DisplayList;
