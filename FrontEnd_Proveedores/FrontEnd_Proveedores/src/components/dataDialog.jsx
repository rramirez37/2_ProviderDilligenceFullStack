import { Fragment, useEffect, useState } from "react";
import { TextField, Button, Box, Paper, Typography, Dialog, Select, MenuItem, Menu, IconButton, Stack, FormControl, DialogTitle, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

let emptyErrors = {
    companyName: '',
    commercialName: '',
    taxIdentifier: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
    countryId: '',
    annualBilling: ''
}

export default function DataDialog({ type, isOpen, editSupplier, onClickSpecificOperation, countryList, handleClose }) {

    const [currentSupplier, setCurrentSupplier] = useState({});
    //Manage errors
    const [errors, setFormErrors] = useState(emptyErrors)

    useEffect(() => {
        console.log(currentSupplier)
    }, [currentSupplier])

    useEffect(() => {

    }, [isOpen])

    const dataValidation = () => {

        const websiteRegex = /^www\.([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        let errorList = {}
        let isValidData = true;

        if (!currentSupplier.companyName) {
            isValidData = false
            errorList.companyName = "Required field"
        }

        if (!currentSupplier.commercialName) {
            isValidData = false
            errorList.commercialName = "Required field"
        }

        if (!currentSupplier.taxIdentifier) {
            isValidData = false;
            errorList.taxIdentifier = 'Required field';
        } else if (!/^\d{11}$/.test(currentSupplier.taxIdentifier)) {
            isValidData = false;
            errorList.taxIdentifier = 'Identifier must be an 11 digit number';
        }

        if (!currentSupplier.phoneNumber) {
            isValidData = false
            errorList.phoneNumber = "Required field"
        }

        if (!currentSupplier.email) {
            isValidData = false;
            errorList.email = 'Required field';
        } else if (!/\S+@\S+\.\S+/.test(currentSupplier.email)) {
            isValidData = false;
            errorList.email = 'Email must be valid';
        }

        if (!currentSupplier.website) {
            isValidData = false;
            errorList.website = 'Required field';
        } else if (!websiteRegex.test(currentSupplier.website)) {
            isValidData = false;
            errorList.website = 'URL must be valid. EJM: www.google.com';
        }

        if (!currentSupplier.address) {
            isValidData = false
            errorList.address = "Required field"
        }

        if (!currentSupplier.countryId) {
            isValidData = false
            errorList.countryId = "Required field"
        }

        if (!currentSupplier.annualBilling) {
            isValidData = false;
            errorList.annualBilling = 'Required field';
        } else if (isNaN(currentSupplier.annualBilling) || parseFloat(currentSupplier.annualBilling) <= 0) {
            isValidData = false;
            errorList.annualBilling = 'Must be a valid number';
        }

        setFormErrors(errorList)
        return isValidData

    }

    //If is open, check if set supplier to edit or not
    useEffect(() => {
        if (isOpen) {
            if (type == 'edit') {
                setCurrentSupplier(editSupplier)
            } else setCurrentSupplier({})
            setFormErrors(emptyErrors)
        } else setCurrentSupplier({})
        console.log(countryList)
    }, [isOpen])

    const handleSupplierChange = (event) => {
        const { name, value } = event.target
        setCurrentSupplier(prevSupp => ({
            ...prevSupp,
            [name]: value
        }))
    }

    const OnClickOperation = () => {
        if (dataValidation()) {
            console.log(currentSupplier)
            if (type == 'edit') {
                onClickSpecificOperation(currentSupplier.id, currentSupplier)
            } else {
                //Create function
                onClickSpecificOperation(currentSupplier)
            }
        } else console.log("Errores")


    }

    return (<Fragment>
        <Dialog open={isOpen} fullWidth={true} maxWidth='md'>
                <Paper>
                    <Fragment>
                        <DialogTitle sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                        >
                            {type == 'edit' ? "Edit Supplier": "Create New Supplier"}
                            <IconButton><CloseIcon onClick={handleClose} sx={{ color: '#FFFFFF' }}></CloseIcon></IconButton>
                        </DialogTitle>

                    </Fragment>
                    <Box sx={{ p: 3 }} alignContent={'center'}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Company Name"
                                    name="companyName"
                                    value={currentSupplier?.companyName}
                                    onChange={handleSupplierChange}
                                    error={!!errors.companyName}
                                    helperText={errors.companyName}
                                    fullWidth
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Commercial Name"
                                    name="commercialName"
                                    value={currentSupplier?.commercialName}
                                    onChange={handleSupplierChange}
                                    error={!!errors.commercialName}
                                    helperText={errors.commercialName}
                                    fullWidth
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Tax Identifier"
                                    name="taxIdentifier"
                                    value={currentSupplier?.taxIdentifier}
                                    onChange={handleSupplierChange}
                                    error={!!errors.taxIdentifier}
                                    helperText={errors.taxIdentifier}
                                    fullWidth
                                >
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={currentSupplier.phoneNumber}
                                    onChange={handleSupplierChange}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    fullWidth
                                    
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={currentSupplier.email}
                                    onChange={handleSupplierChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    fullWidth
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Website"
                                    name="website"
                                    value={currentSupplier.website}
                                    onChange={handleSupplierChange}
                                    error={!!errors.website}
                                    helperText={errors.website}
                                    fullWidth
                                >
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={currentSupplier.address}
                                    onChange={handleSupplierChange}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                    fullWidth
                                    sx={{ height: '100%' }}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    select
                                    name='countryId'
                                    value={currentSupplier.countryId}
                                    label={"Select a country"}
                                    onChange={handleSupplierChange}
                                    defaultValue={''}
                                    error={!!errors.countryId}
                                    helperText={errors.countryId}
                                    fullWidth
                                    sx={{ height: '100%' }}
                                >
                                    <MenuItem value=''>
                                        None
                                    </MenuItem>
                                    {countryList.map(ctr => {
                                        return (<MenuItem key={ctr.id} value={ctr.id} >
                                            {ctr.name}
                                        </MenuItem>)
                                    })}

                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Annual Billing ($)"
                                    name="annualBilling"
                                    value={currentSupplier.annualBilling}
                                    onChange={handleSupplierChange}
                                    error={!!errors.annualBilling}
                                    helperText={errors.annualBilling}
                                    fullWidth
                                >
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button onClick={OnClickOperation} variant="contained" 
                        >{type == 'edit' ? "SAVE CHANGES" : "CREATE SUPPLIER"}</Button>
                    </Box>
                </Paper>
        </Dialog >
    </Fragment >)


}