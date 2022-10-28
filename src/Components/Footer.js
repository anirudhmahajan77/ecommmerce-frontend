import React from "react";
import styles from "../Style/Footer.module.css";

class Footer extends React.Component{
    render(){
        return(
            <div className={styles.footerContainer}>
                <p className={styles.copyright}>Copyright &copy; 2022 Books & Co.</p>
            </div>
        );
    }
}

export default Footer;