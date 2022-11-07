import React, { Component } from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import axios from '../api/axios';
import styles from "../Style/AuthorDetails.module.css";
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Avatar from '@mui/material/Avatar';
import Product from '../Components/Product';

export default class AuthorDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: {},
      loading: true,
      publications: 0,
      books:[]
    }
  }

  componentDidMount() {
    axios.get(`/author/${this.props.authorId}`)
      .then((response) => {
        console.log(response.data.books)
        this.setState({ author: response.data, 
          publications: response.data.books.length,
        books: response.data.books })
      })
      .catch((err) => {
        console.log("Author Details error:" + err)
      })
    this.setState({ loading: false })
    
  }

  render() {
    let birth = new Date(this.state.author.birth)
    let death;
    if (this.state.author.death !== null) {
      death = new Date(this.state.author.death);
    }
    return (
      <div>
        <Header searchValue="" />
        {this.state.loading ?
          <Loading /> :
          <div className={styles.authorBody}>
            <div>
              <h3 className={styles.searchHeader}>Author Details</h3>
            </div>
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link className={styles.breadcrumbLink} to="/">Home</Link>
                <Link className={styles.breadcrumbLink} to="/authors">Authors</Link>
                <Typography color="text.primary">{this.state.author.firstname} {this.state.author.lastname}</Typography>
              </Breadcrumbs>
            </div>
            <div className={styles.authorProfile}>
              <Avatar
                alt={this.props.firstName}
                className={styles.avatar}
                src={`${process.env.REACT_APP_LOCAL_URL}/image/${this.state.author.imageId}`}
                sx={{ width: 120, height: 120 }}
              />
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>{this.state.author.firstname} {this.state.author.lastname}</p>
                <p className={styles.age}>Birth: {birth.getFullYear()}</p>
                {this.state.author.death !== null ?
                  <p className={styles.age}>Death: {death.getFullYear()}</p> : null}
                <p className={styles.authorBio}>{this.state.author.bio}</p>
              </div>
            </div>
            <div className={styles.publicationContainer}>
              <p className={styles.publicationHeading}>Publications: {this.state.publications}</p>
              <div className={styles.bookList}>
              {this.state.books.map((product)=>{return (
                <Product
                key={product.id}
                productId={product.id}
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
              )})}
              </div>
            </div>
          </div>
        }
        <Footer />
      </div>
    )
  }
}
