import React, { Component } from 'react';
import axios from '../api/axios';


export default class extends Component {
  render() {
    return (
      <div>{this.props.bookId} has {this.props.quantity}</div>
    )
  }
}
