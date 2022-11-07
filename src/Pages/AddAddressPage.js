import React from 'react';
import { useNavigate } from "react-router-dom";
import AddAddressForm from '../Components/AddAddressForm';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import styles from "../Style/AddAddressPage.module.css";

export default function AddAddressPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Header searchValue="" />
      <div className={styles.addBody}>
        <div>
          <h3 className={styles.addHeader}>My Wishlist</h3>
        </div>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={styles.breadcrumbLink} to="/">Home</Link>
            <Link className={styles.breadcrumbLink} to="/address">Address</Link>
            <Typography color="text.primary">New Address</Typography>
          </Breadcrumbs>
        </div>
        <AddAddressForm navigate={navigate} />
      </div>
      <Footer />
    </div>
  )
}
