import React, { Component } from 'react'

export default class ProductShop extends Component {

    constructor(props){
        super(props)
    }
  render() {
    return (
      <div>{this.props.bookName}</div>
    )
  }
}
