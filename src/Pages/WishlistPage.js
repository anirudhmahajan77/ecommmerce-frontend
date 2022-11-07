import React, { Component } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';
import axios from '../api/axios';
import styles from "../Style/WishlistPage.module.css";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import WishlistProduct from '../Components/WishlistProduct';
import EmptyWishlist from '../Components/EmptyWishlist';

export default class WishlistPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      wishlist: []
    }
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("auth"));
    axios.get('/wishlist', { headers: { "Authorization": data.token } })
      .then((response) => {
        //console.log("Wishlist is: "+JSON.stringify(response.data));
        this.setState({ wishlist: response.data })
      })
      .catch((err) => {
        console.log("Wishlist error:" + err);
      })
    this.setState({ loading: false })

  }

  render() {
    return (
      <div>
        <Header searchValue="" />
        <div className={styles.wishlistBody}>
          <div>
            <h3 className={styles.wishlistHeader}>My Wishlist</h3>
          </div>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link className={styles.breadcrumbLink} to="/">Home</Link>
              <Typography color="text.primary">Wishlist</Typography>
            </Breadcrumbs>
          </div>

          {this.state.loading ?
            <Loading /> :
            this.state.wishlist.length !== 0?
            <div className={styles.wishlistContainer}>
              {this.state.wishlist.map((product) => {
                return (
                  <WishlistProduct
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    description={product.description}
                    published={product.published}
                    imageId={product.imageId}
                    authorId={product.authorId}
                    rating={product.rating}
                    discount={product.discount}
                    genre={product.genre}
                    favorite={product.favorite}
                  />
                )
              })}
            </div>:
            <EmptyWishlist />
          }
        </div>
        <Footer />
      </div>
    )
  }
}
