import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import styles from "../Style/AddAddressPage.module.css";
import EditAddressForm from '../Components/EditAddressForm';

export default function EditAddressPage() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Header searchValue="" />
      <div className={styles.addBody}>
        <div>
          <h3 className={styles.addHeader}>Edit Address</h3>
        </div>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className={styles.breadcrumbLink} to="/">Home</Link>
            <Link className={styles.breadcrumbLink} to="/address">Address</Link>
            <Typography color="text.primary">Edit Address</Typography>
          </Breadcrumbs>
        </div>
        <EditAddressForm
        id={params.addressId}
        navigate={navigate}
        />
      </div>
      <Footer />
    </div>
  )
}
