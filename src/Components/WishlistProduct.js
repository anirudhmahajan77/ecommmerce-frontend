import React, { Component } from 'react';
import styles from "../Style/WishlistProduct.module.css";
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { FiTrash } from "react-icons/fi";

export default class WishlistProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: {},
            addToCart: {},
            user: {}
        }
    }

    componentDidMount() {
        axios.get(`/author/${this.props.authorId}`)
            .then((response) => {
                //console.log("Wishlist author is:"+ JSON.stringify(response.data));
                this.setState({
                    author: response.data, addToCart: {
                        "bookId": this.props.id,
                        "quantity": 1
                    }
                })
            })
            .catch((err) => {
                console.log("Wishlist product error: " + err);
            })
        let data = JSON.parse(localStorage.getItem("auth"));
        this.setState({ user: data })
    }

    addToCart = () => {
        axios.post(`/wishlist/move`, this.state.addToCart,
            { headers: { "Authorization": this.state.user.token } })
            .then(() => {
                window.location.reload()
            })
            .catch((err) => {
                console.log("Error in Wishlist to cart: " + err)
            })
    }

    removeFromWishlist = () => {
        axios.delete(`/wishlist/${this.props.id}`,
            { headers: { "Authorization": this.state.user.token } })
            .then(() => {
                window.location.reload()
            })
            .catch((err) => {
                console.log("Error in Wishlist remove: " + err)
            })
    }

    render() {
        return (
            <div className={styles.wishlistProduct}>
                <div>
                    <img
                        src={`${process.env.REACT_APP_LOCAL_URL}/image/${this.props.imageId}`}
                        alt={this.props.name}
                        className={styles.wishlistImage} />
                </div>
                <div className={styles.bookInfo}>
                    <Link to={`/book/${this.props.id}`} className={styles.bookName}>{this.props.name}</Link>
                    <p>By: <Link className={styles.authorName}>{this.state.author.firstname} {this.state.author.lastname}</Link></p>
                    <Rating name="half-rating-read" defaultValue={this.props.rating} precision={0.1} readOnly />
                    {this.props.stock < 10 && this.props.stock > 0 ?
                        <p className={styles.stock}>Hurry Up! Only {this.props.stock} left in stock.</p>
                        : null}
                </div>
                <div className={styles.bookPrice}>
                    {this.props.discount === 0 ?
                        <div className={styles.bookPrice}>
                            <p className={styles.price}>&#8377;{this.props.price}</p>
                        </div> :
                        <div className={styles.bookPrice}>
                            <p className={styles.discountPrice}>&#8377;{this.props.price - ((this.props.price / 100) * this.props.discount)}</p>
                            <p className={styles.actualPrice}>&#8377;{this.props.price}</p>
                        </div>
                    }
                </div>
                <div className={styles.btnContainer}>
                    {this.props.stock === 0 ?
                        <p className={styles.outOfStock}>Out Of Stock!</p> :
                        <p className={styles.moveToCart} onClick={this.addToCart}>Move To Cart</p>}
                    <p className={styles.deleteBtn} onClick={this.removeFromWishlist}>Remove <FiTrash className={styles.binIcon} /></p>
                </div>
            </div>
        )
    }
}
