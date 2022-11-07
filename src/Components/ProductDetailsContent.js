import React, { Component } from 'react';
import axios from '../api/axios';
import styles from "../Style/ProductDetails.module.css";
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiPackage, FiLock, FiHeart, FiCheckSquare } from "react-icons/fi";
import Loading from "../Components/Loading";
import { AiFillHeart } from "react-icons/ai";
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';

export default class ProductDetailsContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            author: {},
            genre: "",
            loading: true,
            outOfStock: true,
            inCart: false,
            inWishlist: false,
            isLoggedIn: false,
            data: {},
        }
    }

    componentDidMount() {
        axios.get(`/book/${this.props.bookId}`).then((response) => {
            this.setState({ product: response.data, loading: false })
            if (response.data.genre === "SCI_FI") {
                this.setState({ genre: "SCI-FI" })
            } else {
                this.setState({ genre: response.data.genre });
            }
            if (response.data.genre === "SELF_HELP") {
                this.setState({ genre: "Self Help" })
            }
            if (response.data.stock > 0) {
                this.setState({ outOfStock: false })
            }
            return response.data;
        }).then((res) => {
            axios.get(`/author/${res.authorId}`).then((response) => {
                this.setState({ author: response.data })
            })
        })
            .catch((err) => {
                console.log("Product Details Error");
            })
        let data = localStorage.getItem("auth");
        if (data !== null) {
            data = JSON.parse(data);
            this.setState({ isLoggedIn: true, data: data })
            axios.get(`/cart/check/${this.props.bookId}`,
                { headers: { "Authorization": data.token } }).then((response) => {
                    this.setState({ inCart: response.data })
                }).catch((err) => {
                    console.log("In Cart error: " + err);
                })

            axios.get(`/wishlist/check/${this.props.bookId}`,
                { headers: { "Authorization": data.token } }).then((response) => {
                    this.setState({ inWishlist: response.data })
                }).catch((err) => {
                    console.log("In Wishlist error: " + err);
                })
        }
    }
    addToCart = () => {
        axios.post(`/cart/${this.props.bookId}`, {},
            { headers: { "Authorization": this.state.data.token } }).then((response) => {
                console.log("Cart is: " + JSON.stringify(response.data));
            }).catch((err) => {
                console.log("Add To Cart Error!" + err);
            })
        this.setState({ inCart: true })
        window.location.reload();
    }

    removeFromCart = () => {
        axios.delete(`/cart/${this.props.bookId}`,
            { headers: { "Authorization": this.state.data.token } }).then((response) => {
                console.log("Cart delete is: " + JSON.stringify(response.data));
            }).catch((err) => {
                console.log("Remove from Cart Error!" + err);
            })
        this.setState({ inCart: false })
        window.location.reload();
    }

    addToWishlist = () => {
        axios.post(`/wishlist/${this.props.bookId}`, {},
            { headers: { "Authorization": this.state.data.token } }).then((response) => {
                console.log("Wishlist add is: " + JSON.stringify(response.data));
            }).catch((err) => {
                console.log("Add To Wishlist Error!" + err);
            })
        this.setState({ inWishlist: true })
    }

    removeFromWishlist = () => {
        axios.delete(`/wishlist/${this.props.bookId}`,
            { headers: { "Authorization": this.state.data.token } }).then((response) => {
                console.log("Wishlist delete is: " + JSON.stringify(response.data));
            }).catch((err) => {
                console.log("Remove from wishlist Error!" + err);
            })
        this.setState({ inWishlist: false })
        //window.location.reload();
    }

    render() {
        let date = new Date(this.state.product.published)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        return (
            <div>
                {this.state.loading ?
                    <Loading /> :
                    <div className={styles.detailsContainer}>

                        <div>
                            <p className={styles.bookName}>{this.state.product.name}</p>
                            <p className={styles.authorName}>By <Link className={styles.authorLink} to={`/author/${this.state.author.id}`}>{this.state.author.firstname} {this.state.author.lastname}</Link></p>
                            {this.state.product.discount === 0 ?
                                <div className={styles.priceHolder}>
                                    <p className={styles.price}>&#8377;{this.state.product.price}</p>
                                </div> :
                                <div className={styles.priceHolder}>
                                    <p className={styles.discountPrice}>&#8377;{this.state.product.price - ((this.state.product.price / 100) * this.state.product.discount)}</p>
                                    <p className={styles.actualPrice}>&#8377;{this.state.product.price}</p>
                                </div>
                            }
                            <Rating name="half-rating-read" defaultValue={this.state.product.rating} precision={0.1} readOnly />
                        </div>
                        <div className={styles.imageContainer}>
                            <img
                                className={styles.bookImage}
                                src={`${process.env.REACT_APP_LOCAL_URL}/image/${this.state.product.imageId}`}
                                alt={this.state.product.name} />
                        </div>

                        <div className={styles.contentSection}>
                            <p className={styles.description}>{this.state.product.description}</p>
                            <p className={styles.genre}>In: <Link to={`/genre/${this.state.product.genre}`} className={styles.genreLink}>{this.state.genre}</Link></p>
                            <p className={styles.date}>Publised: {`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`}</p>
                            {this.state.product.stock < 10 && this.state.product.stock>0 ? <p className={styles.stock}>Hurry Up! Only {this.state.product.stock} left in stock.</p> : null}
                            <div className={styles.actionBtnHolder}>
                                {this.state.isLoggedIn ?
                                    this.state.outOfStock ?
                                        <p className={styles.outOfStockBtn}>Out Of Stock <span className={styles.cartIcon}><FiPackage /></span></p> :
                                        this.state.inCart ?
                                            <p className={styles.inCartBtn} onClick={this.removeFromCart}>In Cart <span className={styles.cartIcon}><FiCheckSquare /></span></p>
                                            :
                                            <p className={styles.cartBtn} onClick={this.addToCart}>Add To Cart <span className={styles.cartIcon}><FiShoppingCart /></span></p>
                                    : <Link to="/login" className={styles.lockBtn}>Login/Signup <span className={styles.cartIcon}><FiLock /></span></Link>}
                                {this.state.isLoggedIn ?
                                    !this.state.inWishlist ?
                                    <Tooltip title="Add To Wishlist"><p className={styles.wishlistBtn} onClick={this.addToWishlist}><FiHeart /></p></Tooltip>
                                        : <Tooltip title="Remove From Wishlist"><p className={styles.wishlistBtn} onClick={this.removeFromWishlist}><AiFillHeart className={styles.heart} /></p></Tooltip> : null
                                }
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}
