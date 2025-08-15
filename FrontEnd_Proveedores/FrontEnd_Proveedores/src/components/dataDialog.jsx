import { Fragment, useEffect, useState } from "react";
import { TextField, Button, Box, Paper, Typography, Dialog, Select, MenuItem, Menu, IconButton, Stack, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DataDialog({ type, isOpen, editSupplier, onClickSpecificOperation, countryList, handleClose }) {

    const [currentSupplier, setCurrentSupplier] = useState({});

    useEffect(() => {
        console.log(currentSupplier)
    }, [currentSupplier])

    //If is open, check if set supplier to edit or not
    useEffect(() => {
        if (isOpen) {
            if (type == 'edit') {
                setCurrentSupplier(editSupplier)
            } else setCurrentSupplier({})
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
        if (type == 'edit') {
            onClickSpecificOperation(currentSupplier.id, currentSupplier)
        } else {
            //Create function
            onClickSpecificOperation(currentSupplier)
        }
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
                            >
                            </TextField>
                            <TextField
                                label="Commercial Name"
                                variant="standard"
                                name="commercialName"
                                value={currentSupplier?.commercialName}
                                onChange={handleSupplierChange}
                            >
                            </TextField>
                            <TextField
                                label="Tax Identifier"
                                variant="standard"
                                name="taxIdentifier"
                                value={currentSupplier?.taxIdentifier}
                                onChange={handleSupplierChange}
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
                            >
                            </TextField>
                            <TextField
                                label="Email"
                                variant="standard"
                                name="email"
                                value={currentSupplier.email}
                                onChange={handleSupplierChange}
                            >
                            </TextField>
                            <TextField
                                label="Website"
                                variant="standard"
                                name="website"
                                value={currentSupplier.website}
                                onChange={handleSupplierChange}
                            >
                            </TextField>
                        </Stack>
                    </Box>
                    <FormControl fullWidth direction="row">
                        <Stack direction="row" spacing={2} sx={{flex:1}}>
                            <TextField
                                label="Address"
                                variant="standard"
                                name="address"
                                value={currentSupplier.address}
                                onChange={handleSupplierChange}
                            >
                            </TextField>
                            <Select
                                name='countryId'
                                value={currentSupplier.countryId}
                                label={"Select a country"}
                                onChange={handleSupplierChange}
                                defaultValue={''}
                            >
                                <MenuItem value=''>
                                    None
                                </MenuItem>
                                {countryList.map(ctr => {
                                    return (<MenuItem key={ctr.id} value={ctr.id} >
                                        {ctr.name}
                                    </MenuItem>)
                                })}

                            </Select>
                            <TextField
                                label="Annual Billing ($)"
                                variant="standard"
                                name="annualBilling"
                                value={currentSupplier.annualBilling}
                                onChange={handleSupplierChange}
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