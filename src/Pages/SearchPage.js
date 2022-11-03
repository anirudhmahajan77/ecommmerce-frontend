import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "../Style/SearchPage.module.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import NoResult from '../Components/NoResult';
import axios from '../api/axios';
import Product from '../Components/Product';
import Pagination from '@mui/material/Pagination';
import Loading from '../Components/Loading';

export default function SearchPage() {
  const params = useParams();
  const [result, setResult] = useState([])

  const [page, setPage] = React.useState(1);
  const [status, setStatus] = useState(true);
  const [pageLength, setPageLength] = useState(0);
  const [bookLength, setBookLength] = useState(0);
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    axios.get(`/book/search/${params.bookValue}/${page - 1}`).then((response) => {
      console.log("Search Result: " + JSON.stringify(response.data))
      if (response.data.length !== 0) {
        //window.alert(JSON.stringify(response.data))
        setResult(response.data.result)
        setPageLength(Math.ceil(response.data.resultLength / 9))
        setBookLength(response.data.resultLength)
        setStatus(false)
      }
    }).catch(() => {
      console.log("Search Result Error!")
    })
  }, [page]);

  return (
    <>
      <Header searchValue={params.bookValue} />
      <div className={styles.searchPageBody}>
        <div>
          <h3 className={styles.searchHeader}>Search Results: {bookLength}</h3>
        </div>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={styles.breadcrumbLink} to="/">Home</Link>
            <Link className={styles.breadcrumbLink} to="/shop">Shop</Link>
            <Typography color="text.primary">Search</Typography>
          </Breadcrumbs>
        </div>
        {status ? <Loading /> :
          (
            result.length === 0 ?
              <NoResult /> :
              <div className={styles.resultContentContainer}>
                <div className={styles.resultContent}>
                  {result.map((product) => {
                    return (
                      <><Product
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
                      </>
                    )
                  })}
                </div>
                <div className={styles.page}>
                  <Pagination count={pageLength} page={page} onChange={handleChange} />
                </div>
              </div>
          )
        }
      </div>
      <Footer />
    </>
  )
}
