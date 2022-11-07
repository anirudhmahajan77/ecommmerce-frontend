import React, { Component } from 'react';
import axios from '../api/axios';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styles from "../Style/AuthorPage.module.css";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import AuthorCard from '../Components/AuthorCard';
import Loading from "../Components/Loading";

export default class AuthorPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      authors: [],
      findAuthor: "",
      loading: true,
    }
  }

  componentDidMount(){
    axios.get("/author/all").then((response)=>{
      this.setState({authors: response.data})
    }).catch((err)=>{
      console.log("Author Page Error: "+err)
    })
    this.setState({loading: false})
  }

  render() {
    return (
      <div>
        <Header searchValue="" />
        {this.state.loading?
        <Loading />
        :
        <div className={styles.authorBody}>
          <div>
            <h3 className={styles.authorHeader}>All Authors</h3>
          </div>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link className={styles.breadcrumbLink} to="/">Home</Link>
              <Typography color="text.primary">Authors</Typography>
            </Breadcrumbs>
          </div>
          <div className={styles.searchHolder}>
            <input 
              placeholder="Search Author" 
              className={styles.searchBar}
              value={this.state.findAuthor} 
              onChange={(e)=>(this.setState({findAuthor:e.target.value}))} />
          </div>
          <div className={styles.authorHolder}>
            {this.state.authors.filter((author)=> (author.firstname+" "+author.lastname).toLowerCase().includes(this.state.findAuthor.toLowerCase())).map((author)=>{
              return <AuthorCard 
                        key={author.id}
                        firstName={author.firstname}
                        lastName={author.lastname}
                        id={author.id}
                        imageId={author.imageId}
                        bio={author.bio} />
            })}
          </div>
        </div>}
        <Footer />
      </div>
    )
  }
}
