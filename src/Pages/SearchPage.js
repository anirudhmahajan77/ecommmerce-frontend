import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from "../Style/SearchPage.module.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import NoResult from '../Components/NoResult';
import axios from '../api/axios';
import ProductShop from '../Components/ProductShop';
import Pagination from '@mui/material/Pagination';

export default function SearchPage() {
  const params = useParams();
  const [result, setResult] = useState([])

  const [page, setPage] = React.useState(1);
  const [pageLength, setPageLength] = useState(0);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(()=>{
    axios.get(`/book/search/${params.bookValue}/${page-1}`).then((response)=>{
      console.log("Search Result: "+JSON.stringify(response.data))
      if(response.data.length !== 0){
        //window.alert(JSON.stringify(response.data))
        setResult(response.data.result)
        setPageLength(response.data.resultLength)
      }
    }).catch(()=>{
      console.log("Search Result Error!")
    })
  },[page]);

  return (
    <>
      <Header searchValue={params.bookValue} />
      <div className={styles.searchPageBody}>
        <div>
          <h3 className={styles.searchHeader}>Search Results</h3>
        </div>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={styles.breadcrumbLink} to="/">Home</Link>
            <Link className={styles.breadcrumbLink} to="/shop">Shop</Link>
            <Typography color="text.primary">Search</Typography>
          </Breadcrumbs>
        </div>
        {result.length === 0?
          <NoResult />:
          <div className={styles.resultContentContainer}>
            {result.map((product)=>{
              return (
                <><ProductShop bookName={product.name} /></>
              )
            })}
            <Pagination count={pageLength} page={page} onChange={handleChange} />
            </div>
        }
      </div>
      <Footer />
    </>
  )
}
