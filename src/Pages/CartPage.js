import React, { Component } from 'react';
import axios from '../api/axios';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import styles from "../Style/CartPage.module.css";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import CartProduct from '../Components/CartProduct';

export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cart: [],
    }
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("auth"));
    axios.get('/cart', { headers: { "Authorization": data.token } })
      .then((response) => {
        console.log("Cart is: " + JSON.stringify(response.data));
        this.setState({ cart: response.data })
      })
      .catch((err) => {
        console.log("Cart Page error:" + err);
      })
    this.setState({ loading: false })
  }

  render() {
    return (
      <div>
        <Header searchValue="" />
        <div className={styles.cartBody}>
          <div>
            <h3 className={styles.cartHeader}>My Cart</h3>
          </div>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link className={styles.breadcrumbLink} to="/">Home</Link>
              <Typography color="text.primary">Cart</Typography>
            </Breadcrumbs>
          </div>
          <div>
            {this.state.loading ?
              <Loading /> :
              <div>
                {this.state.cart.map((book)=>{
                  return (
                    <CartProduct bookId={book.bookId} quantity={book.quantity} />
                  )
                })}
              </div>
            }
          </div>
        </div>


        <Footer />
      </div>
    )
  }
}
