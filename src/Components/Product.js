import React, { Component } from 'react'
import styles from "../Style/Product.module.css";
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { FiPercent } from "react-icons/fi";

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state={
      genre:"",
      discount: 0,
      authorFirstName: "",
      authorLastName: ""
    }
  }

  componentDidMount(){
    if(this.props.genre === "SCI_FI"){
      this.setState({genre:"SCI-FI"})
    } else {
      this.setState({genre:this.props.genre});
    }
    if(this.props.genre === "SELF_HELP"){
      this.setState({genre: "SELF HELP"})
    }
    if(this.props.discount !== 0){
      this.setState({discount: this.props.discount});
    }
    axios.get(`/author/${this.props.authorId}`).then((response)=>{
      //window.alert(JSON.stringify(response))
      this.setState({
        authorFirstName: response.data.firstname,
        authorLastName: response.data.lastname,
      })
    })
  }

  render() {
    return (
      <div className={styles.product}>
        {this.props.discount !== 0?
        <div className={styles.saleIconContainer}>
        <FiPercent />
      </div>: <div className={styles.discountFix}></div>}
        <div>
          <img
            src={`${process.env.REACT_APP_LOCAL_URL}/image/${this.props.imageId}`}
            alt={this.props.name}
            className={styles.bookImage} />
        </div>
        <div className={styles.bookInfo}>
          <p className={styles.bookName}>{this.props.name}</p>
          <p className={styles.authorNameContainer}>By <Link className={styles.authorName} to={`/author/${this.props.authorId}`}>{this.state.authorFirstName} {this.state.authorLastName}</Link></p>
          <Link to={`/genre/${this.props.genre}`} className={styles.bookGenre}>{this.state.genre}</Link>
          <div className={styles.priceHolder}>
          <p className={styles.newPrice}>&#8377;{(this.props.price)-((this.props.price/100) * this.props.discount)}</p>
          {this.state.discount !== 0?
            <p className={styles.actualPrice}>&#8377;{this.props.price}</p>
            :null}
          </div>
          <div className={styles.btnHolder}>
            <Link to={`/book/${this.props.productId}`} className={styles.productButton}>View Details</Link>
          </div>
          
        </div>
      </div>
    )
  }
}
