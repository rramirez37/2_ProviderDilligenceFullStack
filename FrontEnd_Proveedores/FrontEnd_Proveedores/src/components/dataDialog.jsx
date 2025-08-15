import { Fragment, useEffect, useState } from "react";
import { TextField, Button, Box, Paper, Typography, Dialog, Select, MenuItem, Menu, IconButton, Stack, FormControl } from '@mui/material';
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

    },[isOpen])

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
        <Dialog open={isOpen}>
            <Box display={true} >
                <Paper>
                    <Fragment>
                        <Typography>Create new supplier</Typography>
                        <IconButton><CloseIcon onClick={handleClose}></CloseIcon></IconButton>
                    </Fragment>
                    <Box sx={{ width: '100%' }}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Company Name"
                                variant="standard"
                                name="companyName"
                                value={currentSupplier?.companyName}
                                onChange={handleSupplierChange}
                                error={!!errors.companyName}
                                helperText={errors.companyName}
                            >
                            </TextField>
                            <TextField
                                label="Commercial Name"
                                variant="standard"
                                name="commercialName"
                                value={currentSupplier?.commercialName}
                                onChange={handleSupplierChange}
                                error={!!errors.commercialName}
                                helperText={errors.commercialName}
                            >
                            </TextField>
                            <TextField
                                label="Tax Identifier"
                                variant="standard"
                                name="taxIdentifier"
                                value={currentSupplier?.taxIdentifier}
                                onChange={handleSupplierChange}
                                error={!!errors.taxIdentifier}
                                helperText={errors.taxIdentifier}
                            >
                            </TextField>
                        </Stack>

                    </Box>
                    <Box>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Phone Number"
                                variant="standard"
                                name="phoneNumber"
                                value={currentSupplier.phoneNumber}
                                onChange={handleSupplierChange}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber}
                            >
                            </TextField>
                            <TextField
                                label="Email"
                                variant="standard"
                                name="email"
                                value={currentSupplier.email}
                                onChange={handleSupplierChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            >
                            </TextField>
                            <TextField
                                label="Website"
                                variant="standard"
                                name="website"
                                value={currentSupplier.website}
                                onChange={handleSupplierChange}
                                error={!!errors.website}
                                helperText={errors.website}
                            >
                            </TextField>
                        </Stack>
                    </Box>
                    <FormControl fullWidth direction="row">
                        <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                            <TextField
                                label="Address"
                                variant="standard"
                                name="address"
                                value={currentSupplier.address}
                                onChange={handleSupplierChange}
                                error={!!errors.address}
                                helperText={errors.address}
                            >
                            </TextField>
                            <TextField
                                select
                                name='countryId'
                                value={currentSupplier.countryId}
                                label={"Select a country"}
                                onChange={handleSupplierChange}
                                defaultValue={''}
                                error={!!errors.countryId}
                                helperText={errors.countryId}
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
                            <TextField
                                label="Annual Billing ($)"
                                variant="standard"
                                name="annualBilling"
                                value={currentSupplier.annualBilling}
                                onChange={handleSupplierChange}
                                error={!!errors.annualBilling}
                                helperText={errors.annualBilling}
                            >
                            </TextField>
                        </Stack>
                    </FormControl>


                    <Button onClick={OnClickOperation}>{type == 'edit' ? "SAVE CHANGES" : "CREATE SUPPLIER"}</Button>

                </Paper>
            </Box>
        </Dialog>
    </Fragment>)


}