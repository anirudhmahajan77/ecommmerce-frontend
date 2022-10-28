import React from "react";
import styles from "../Style/Home.module.css";
import Footer from "./Footer";
import Header from "./Header";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <Header />
                <div className={styles.landingContainer}>
                    <div className={styles.homeHeading}>
                        We Deliver Experiences!
                    </div>
                </div>
                <div className={styles.uspContainer}>
                    <div className={styles.uspAssets}>
                        <div className={styles.uspDoor}></div>
                        <div className={styles.uspBook}></div>
                    </div>
                    <div className={styles.uspContentContainer}>
                        <p className={styles.uspContent}>We Have Best Curated Book Collection.</p>
                    </div>
                </div>
                <div className={styles.lastCtaContainer}>
                    <div className={styles.lastCta}>
                        <p className={styles.lastCtaHeading}>Live The Imagination!<br />
                            <p className={styles.lastCtaSummary}>Choose from the best book collection ever made.</p></p>
                        <p className={styles.lastCtaBtn}>Explore</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Home;