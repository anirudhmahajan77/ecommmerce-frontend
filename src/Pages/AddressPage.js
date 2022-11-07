import React, { Component } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import styles from "../Style/AddressPage.module.css";
import Loading from "../Components/Loading";
import axios from '../api/axios';
import Address from '../Components/Address';
import { FiPlus } from "react-icons/fi";

export default class AddressPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      loading: true,
    }
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("auth"));
    axios.get("/address", { headers: { "Authorization": data.token } })
      .then((response) => {
        console.log(JSON.stringify(response.data))
        this.setState({ address: response.data });
      })
      .catch((err) => {
        console.log("Address Page error: " + err)
      })
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <Header searchValue="" />
        <div className={styles.addressPageBody}>
          <div className={styles.headerSection}>
            <div className={styles.headerContent}>
              <div>
                <h3 className={styles.addressHeader}>My Address</h3>
              </div>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link className={styles.breadcrumbLink} to="/">Home</Link>
                  <Typography color="text.primary">Address</Typography>
                </Breadcrumbs>
              </div>
            </div>
            <div>
              <Link to="/address/add" className={styles.addBtn}><FiPlus className={styles.icon}/> Add Address</Link>
            </div>
          </div>
          {this.state.loading ? <Loading /> :
            <div className={styles.addressHolder}>
              {this.state.address.map((ad) => {
                return (
                  <Address
                    id={ad.id}
                    key={ad.id}
                    title={ad.title}
                    number={ad.number}
                    houseNumber={ad.houseNumber}
                    locality={ad.locality}
                    state={ad.state}
                    pinCode={ad.pinCode}
                    country={ad.country}
                  />
                )
              })}
            </div>}

        </div>
        <Footer />
      </div>
    )
  }
}
