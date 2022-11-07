import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "../Style/AddAddressPage.module.css";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from '../api/axios';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: "",
                number: "",
                houseNumber: "",
                locality: "",
                state: "",
                pinCode: 0,
                country: ""
            },
            open: false,
        }
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("auth"));
        axios.get(`/address/${this.props.id}`, { headers: { "Authorization": data.token } })
            .then((response) => {
                this.setState(prev => {
                    return {
                        ...prev, form: response.data
                    }
                });
            })
            .catch((err) => {
                console.log("Edit Address Error: " + err)
            })
    }


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState(prev => {
            return {
                ...prev, open: false
            }
        });
    };

    submitAddress = () => {
        if (this.state.form.title === '' ||
            this.state.form.number === '' ||
            this.state.form.country === '' ||
            this.state.form.houseNumber === '' ||
            this.state.form.locality === '' ||
            this.state.form.pinCode === 0 ||
            this.state.form.state === '') {
            this.setState(prev => {
                return {
                    ...prev, open: true
                }
            });
        } else {
            let data = JSON.parse(localStorage.getItem("auth"));
            axios.put(`/address/${this.props.id}`, this.state.form,
                { headers: { "Authorization": data.token } })
                .catch((err) => {
                    console.log("Edit Address Form Error: " + err)
                })

            this.props.navigate("/address");
        }
    }

    handleChange = (e) => {
        this.setState(prev => {
            return {
                form: { ...prev.form, [e.target.name]: e.target.value }
            }
        });
    }
    render() {
        const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
        });
        return (
            <div className={styles.editFormBody}>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="error" sx={{ width: '100%', color: "white" }}>
                            No Field Can Be Empty!
                        </Alert>
                    </Snackbar>
                </Stack>
                <div className={styles.formHolder}>
                    <TextField
                        id="standard-basic"
                        label="Title"
                        required
                        className={styles.inputField}
                        name='title'
                        value={this.state.form.title}
                        onChange={this.handleChange}
                        variant="standard" />

                    <TextField
                        id="standard-basic"
                        label="Phone Number"
                        className={styles.inputField}
                        required
                        name='number'
                        value={this.state.form.number}
                        onChange={this.handleChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+91</InputAdornment>
                        }}
                        variant="standard" />

                    <TextField
                        id="standard-basic"
                        className={styles.inputField}
                        label="House Number"
                        required
                        name='houseNumber'
                        value={this.state.form.houseNumber}
                        onChange={this.handleChange}
                        variant="standard" />

                    <TextField
                        id="standard-basic"
                        label="Locality"
                        required
                        name='locality'
                        className={styles.inputField}
                        value={this.state.form.locality}
                        onChange={this.handleChange}
                        variant="standard" />

                    <TextField
                        id="standard-basic"
                        label="State"
                        required
                        className={styles.inputField}
                        name='state'
                        value={this.state.form.state}
                        onChange={this.handleChange}
                        variant="standard" />

                    <TextField
                        id="standard-basic"
                        label="Pincode"
                        className={styles.inputField}
                        required
                        name='pinCode'
                        value={this.state.form.pinCode}
                        onChange={this.handleChange}
                        variant="standard" />

                    <TextField
                        id="standard-basic"
                        label="Country"
                        required
                        className={styles.inputField}
                        name='country'
                        value={this.state.form.country}
                        onChange={this.handleChange}
                        variant="standard" />
                </div>
                <p className={styles.submitBtn} onClick={this.submitAddress}>Save Address</p>
            </div>
        )
    }
}