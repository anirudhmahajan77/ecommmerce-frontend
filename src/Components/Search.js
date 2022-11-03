import React, { useState, useEffect } from 'react'
import styles from "../Style/Search.module.css";
import { useNavigate } from 'react-router-dom';
import { FiX, FiSearch } from "react-icons/fi";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Search(props) {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setSearchValue(props.value);
    }, []);
    const [open, setOpen] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const searchBook = () => {
        if (searchValue.length !== 0) {
            navigate('/search/' + searchValue);
            window.location.reload();
        } else {
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const updateBook = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%', color:"white" }}>
                        Search Value Cannot By Empty!
                    </Alert>
                </Snackbar>
            </Stack>
            <div className={styles.searchBar}>
                <input
                    placeholder='Search Book...'
                    className={styles.searchInput}
                    value={searchValue}
                    onChange={updateBook}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            searchBook()
                        }
                    }}
                />
                {searchValue.length > 0 ?
                    <FiX onClick={() => { setSearchValue('') }} className={styles.clear} />
                    : <p className={styles.clear}></p>}
                <p className={styles.search} onClick={searchBook}><FiSearch /></p>
            </div>
        </>
    )

}

export default Search;