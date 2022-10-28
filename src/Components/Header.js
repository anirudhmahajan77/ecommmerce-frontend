import React from "react";
import styles from "../Style/Header.module.css";
import logo from "../Assets/logo.svg";
class Header extends React.Component{

    render(){
        return(
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                <div className={styles.logo} data-img-url={logo}></div>
                </div>
                <div className={styles.menuContent}>
                    <div className={styles.headerMenu}>
                        <p className={styles.headerMenuLink}>Shop</p>
                        <p className={styles.headerMenuLink}>Authors</p>
                    </div>
                    <div className={styles.loggedSection}>
                        <p className={styles.loginBtn}>Log In / Register</p>
                    </div>
                </div>
            </div>
        );
    }

}
export default Header;