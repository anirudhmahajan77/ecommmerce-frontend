import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import styles from "../Style/AuthorCard.module.css";

export default class AuthorCard extends Component {
  render() {
    return (
      <div className={styles.authorCard}>
        <div>
        <Avatar
        alt={this.props.firstName}
        src={`${process.env.REACT_APP_LOCAL_URL}/image/${this.props.imageId}`}
        sx={{ width: 110, height: 110 }}
      />
        </div>
        <div className={styles.authorDetails}>
            <div className={styles.authorNameHolder}>{this.props.firstName} {this.props.lastName}</div>
            
            <Link to={`/author/${this.props.id}`} className={styles.authorLink}>View Details</Link>
        </div>
      </div>
    )
  }
}
