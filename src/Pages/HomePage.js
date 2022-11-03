import React from "react";
import styles from "../Style/Home.module.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Flip from 'react-reveal/Flip';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: [
                {
                    "key": 1,
                    "color": "pink",
                    "name": "Horror",
                    "image": "",
                    "URI": "/book/genre/HORROR",
                },
                {
                    "key": 2,
                    "name": "Sci-Fi",
                    "image": "../Assets/Books/500.jpg",
                    "URI": "/book/genre/SCI_FI",
                },
                {
                    "key": 3,
                    "name": "Drama",
                    "image": "../Assets/Books/500.jpg",
                    "URI": "/book/genre/DRAMA",
                },
                {
                    "key": 4,
                    "name": "Self Help",
                    "image": "../Assets/Books/500.jpg",
                    "URI": "/book/genre/SELF_HELP",
                },
                {
                    "key": 5,
                    "name": "Mystery",
                    "image": "../Assets/Books/500.jpg",
                    "URI": "/book/genre/MYSTERY",
                },
                {
                    "key": 6,
                    "name": "Literature",
                    "image": "../Assets/Books/500.jpg",
                    "URI": "/book/genre/LITERATURE",
                },
            ]
        }
    }

    async componentDidMount() {
        /*let token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmkiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiZXhwIjoxNjY3ODQ1ODAwLCJpYXQiOjE2NjcwMjQwMTN9.s-0GgnD61HuudYs45IWtfpWadUqJmrrVleksr2OIpt8";
        
        
        const config = {
            
            headers:{
                'Authorization': token,"Access-Control-Allow-Origin":"*",
            }
          };

        await axios.get(process.env.REACT_APP_LOCAL_URL+"address/all",config)
        .then(response => {
            if(response.status === 200){
                console.log(response)
            }
        }).catch(err => {
            console.log("Error: "+err);
        })*/
        //console.log("URL: "+process.env.REACT_APP_LOCAL_URL)
    }


    render() {
        return (
            <>
                <Header searchValue="" />

                <div className={styles.landingContainer}>
                    <div className={styles.homeHeading}>
                        <Flip bottom>We Deliver Experiences!</Flip>
                    </div>
                </div>

                <div className={styles.genreSectionContainer}>
                    <div className={styles.genreHeadingContainer}>
                        <h5 className={styles.genreHeading}>TREASURES WE OFFER!</h5>
                    </div>
                    <div className={styles.genreSection}>
                        {
                            this.state.genre.map((genre) => {
                                return (
                                    <div
                                        className={styles.genre} key={genre.key}>
                                        <p className={styles.genreText}>{genre.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.uspContainer}>
                    <div className={styles.uspAssets}>
                        <div className={styles.uspDoor}></div>
                        <div className={styles.uspBook}></div>
                    </div>
                    <div className={styles.uspContentContainer}>
                        <p className={styles.uspContent}>We Have Best <span className={styles.hollow}>Curated</span> Book Collection.</p>
                    </div>
                </div>
                <div className={styles.lastCtaContainer}>
                    <div className={styles.lastCta}>
                        <h5 className={styles.lastCtaHeading}>Live The Imagination!<br />
                            <p className={styles.lastCtaSummary}>Choose from the best book collection ever made.</p></h5>
                        <p className={styles.lastCtaBtn}>Explore</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default HomePage;