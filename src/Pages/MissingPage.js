import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import styles from "../Style/MissingPage.module.css";
import { Link } from 'react-router-dom';

export default function MissingPage() {
  return (
    <>
      <Header searchValue="" />
      <div className={styles.notFoundBody}>
        <div className={styles.notFoundArtContainer}>
          <div className={styles.notFoundArt}></div>
        </div>
        <div className={styles.notFoundContentContainer}>
          <h3 className={styles.notFoundContentHeading}>404!</h3>
          <p className={styles.notFoundContentMessage}>We were not able to find the page you are trying to open.</p>
          <div>
            <Link to="/" className={styles.homeLink}>Home</Link>
            <Link to="/" className={styles.randomBookLink}>Suggest Random Book</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
