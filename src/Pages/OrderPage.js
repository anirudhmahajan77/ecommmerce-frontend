import React, { Component } from 'react'
import axios from '../api/axios';

export class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    let data = localStorage.getItem("auth");
    data = JSON.parse(data);
    await axios.get("/wishlist",{headers:{"Authorization": data.token }})
    .then((response)=>{
      console.log(response.data)
      this.setState({ data: response.data })
    })
    
  }
  render() {
    return (
      <>
        <div>
          OrderPage
        </div>
        <div>
          <p>{this.state.data.length===0?"": 
          <div>
            {this.state.data[0].name} is of genre {this.state.data[0].genre} and costs {this.state.data[0].price} with {this.state.data[0].discount}% discount on it.
          </div>
          }</p>
        </div></>

    )
  }
}

export default OrderPage