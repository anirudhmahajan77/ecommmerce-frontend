import React, { Component } from 'react';
import styles from "../Style/EmptyWishlist.module.css";
import { Link } from 'react-router-dom';

export default class EmptyWishlist extends Component {
  render() {
    return (
      <div className={styles.emptyWishlistBody}>
        <div>
            <div className={styles.wishlistArt}></div>
        </div>
        <div>
            <p className={styles.wishlistHeading}>You Wishlist is empty!</p>
            <p className={styles.wishlistMessage}>seems like you don't have wishes here,<br/> Make a wish!</p>
        </div>
        <div>
            <Link to="/shop" className={styles.shoppingBtn}>Start Shopping</Link>
        </div>
      </div>
    )
  }
}
