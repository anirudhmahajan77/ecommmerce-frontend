import React, { Component } from 'react'
import styles from "../Style/NoResult.module.css";
import { Link } from 'react-router-dom';

export default class NoResult extends Component {
    render() {
        return (
            <div className={styles.noResultBody}>
                <div className={styles.noResultArtContainer}>
                    <div className={styles.NoResultArt}></div>
                </div>
                <div className={styles.noResultContent}>
                    <div className={styles.noResultHeading}>Uh oh!</div>
                    <div className={styles.noResultMessage}>We have searched our world inside out but could not find what you looking for.</div>
                    <div>
                        <Link to="/" className={styles.homeLink}>Home</Link>
                    </div>
                </div>
            </div>
        )
    }
}
