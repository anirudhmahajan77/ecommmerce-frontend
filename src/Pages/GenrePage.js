import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from "../Style/GenrePage.module.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Product from '../Components/Product';
import Loading from '../Components/Loading';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function GenrePage() {
  const params = useParams();
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [genreText, setGenreText] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    setLoading(false);
    setGenre(params.genre)
    if(genre === "SCI_FI"){
      setGenreText("SCI-FI");
    } else {
      setGenreText(params.genre);
    }
    if(genre === "SELF_HELP"){
      setGenreText("SELF-HELP")
    }
    axios.get(`/book/genre/${params.genre}`).then((response)=>{
      //console.log("Data:"+JSON.stringify(response.data))
      setBooks(response.data);
    })
    .catch((err)=>{
      console.log("Genre Page Error: "+ err)
    })
  },[]);

  return (
    <div>
      <Header searchValue="" />
      {loading?
        <Loading />:
        <div className={styles.genreBody}>
          <div>
            <h3 className={styles.genreHeader}>Genre</h3>
          </div>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link className={styles.breadcrumbLink} to="/">Home</Link>
              <Link className={styles.breadcrumbLink} to="/shop">Shop</Link>
              <Typography color="text.primary">{genreText}</Typography>
            </Breadcrumbs>
          </div>
          <div className={styles.resultContent}>
            {books.map((product)=>{
              return (
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
              )
            })}
          </div>
        </div>}
      <Footer />
    </div>
  )
}
