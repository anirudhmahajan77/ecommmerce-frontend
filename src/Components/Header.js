import React, { useEffect, useState } from "react";
import styles from "../Style/Header.module.css";
import logo from "../Assets/logo.svg";
import { Link } from "react-router-dom";
import LoggedHeader from "./LoggedHeader";
import Search from "./Search";

function Header(props) {

    let [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let data = localStorage.getItem("auth");
        if (data !== null) {
            data = JSON.parse(data);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <Link to="/"><div className={styles.logo} data-img-url={logo}></div></Link>
            </div>
            <div>
                <Search value={props.searchValue} />
            </div>
            <div className={styles.menuContent}>
                <div className={styles.headerMenu}>
                    <Link className={styles.headerMenuLink} to={"/shop"} >Shop</Link>
                    <Link className={styles.headerMenuLink} to={"/authors"} >Authors</Link>
                    {isLoggedIn ?
                        <>
                            <Link className={styles.headerMenuLink} to={"/wishlist"} >Wishlist</Link>
                            <Link className={styles.headerMenuLink} to={"/orders"} >Orders</Link>
                        </>
                        : <></>
                    }
                </div>
                <div className={styles.loggedSection}>
                    {isLoggedIn ?
                        <LoggedHeader />                      
                        : <Link className={styles.loginBtn} to={"/login"} >Log In / Register</Link>}
                </div>
            </div>
        </div>
    );
}

export default Header;