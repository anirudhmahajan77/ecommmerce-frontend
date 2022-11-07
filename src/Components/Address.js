import React, { Component } from 'react';
import axios from '../api/axios';
import styles from "../Style/Address.module.css";
import { Link } from 'react-router-dom';
import { FiTrash, FiEdit2 } from "react-icons/fi";

export default class Address extends Component {

    deleteAddress = ()=>{
        let data = JSON.parse(localStorage.getItem("auth"));
        axios.delete(`/address/${this.props.id}`,
        {headers:{"Authorization":data.token}})
        .then(()=>{
            window.location.reload();
        }).catch((err)=>{
            console.log("Delete Address Error:" +err);
        })
    }

  render() {
    return (
      <div className={styles.addressContainer}>
        <div className={styles.addressContent}>
            <div>
                <p className={styles.title}>{this.props.title}</p>
                <p className={styles.data}>Contact: {this.props.number}</p>
                <p className={styles.data}>House Number: {this.props.houseNumber}</p>
                <p className={styles.data}>Locality: {this.props.locality}</p>
                <p className={styles.data}>State: {this.props.state}</p>
                <p className={styles.data}>Pin Code: {this.props.pinCode}</p>
                <p className={styles.data}>Country: {this.props.country}</p>
            </div>
        </div>
        <div className={styles.btnHolder}>
            <Link to={`/address/edit/${this.props.id}`} className={styles.edit}><FiEdit2 className={styles.icon}/> Edit</Link>
            <p className={styles.delete} onClick={this.deleteAddress}><FiTrash/></p>
        </div>
      </div>
    )
  }
}
