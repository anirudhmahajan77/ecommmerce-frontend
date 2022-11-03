import React, { Component } from 'react'
import styles from "../Style/Loading.module.css";

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
        <p className={styles.loadingContent}>Loading...</p>
      </div>
    )
  }
}
