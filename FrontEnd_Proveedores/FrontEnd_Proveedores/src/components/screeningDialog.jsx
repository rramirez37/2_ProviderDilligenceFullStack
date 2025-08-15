import { Box, Button, Checkbox, CircularProgress, Dialog, DialogTitle, FormControlLabel, FormGroup, IconButton, Stack, Typography, DialogContent } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import getWebscrapping from "../api/wscApi";
import ScreeningResults from "./screeningResults";
import CloseIcon from '@mui/icons-material/Close';


export default function ScreeningDialog({ screeningDialogItems, setScreeningDialogItems }) {

    const [doWBL, setDoWBL] = useState(false)
    const [doOFAC, setDoOFAC] = useState(false)
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [screenResults, setScreenResults] = useState({})
    const [failureText, setFailureText] = useState("")
    const [validResults, setValidResults] = useState(false)


    const handleWBLChange = async (e) => {
        setDoWBL(e.target.checked)
    }

    const handleOFACChange = async (e) => {
        setDoOFAC(e.target.checked)
    }

    const handleClose = async () => {
        setScreeningDialogItems({
            name: "",
            state: false
        })
        setScreenResults({})
        setFailureText("")
        setValidResults(false)
        setStep(1)
        setDoOFAC(false)
        setDoWBL(false)
    }


    const executeScreening = async () => {
        setIsLoading(true)
        let results = await getWebscrapping(screeningDialogItems.name, doWBL, doOFAC)
        setScreenResults(results)
    }

    useEffect(() => {
        console.log(screenResults)
        if (Object.keys(screenResults).length != 0) {
            setStep(2)
            setValidResults(true)
            setIsLoading(false)
            if (!screenResults.isSuccessful) setFailureText(screenResults.message)
        }
    }, [screenResults])

    /*
    const executeScreening = async () => {
        setIsLoading(true)
        let results = await getWebscrapping(screeningDialogItems.name, doWBL, doOFAC)
        screenResultsT = results
        await setStep(2)
        await setValidResults(results.isSuccessful)
        await setIsLoading(false)
        if (results.isSuccessful) { //show results
            await setScreenResults(results)
        } else {
            await setFailureText(results.message)
        }
        console.log("Fin screening")
    }*/

    return (
        <Fragment>
            <Dialog open={screeningDialogItems ? screeningDialogItems.state : false}>
                <DialogTitle direction={"row"} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    Supplier Screening
                    {isLoading ? <></> : <IconButton disabled={isLoading} sx={{ color: '#FFFFFF' }}><CloseIcon onClick={handleClose} ></CloseIcon></IconButton>}
                </DialogTitle>
                {step == 1 ?
                    <Fragment>
                        {isLoading ? <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', 
                            alignItems: 'center',
                            minHeight: '200px' 
                        }}>
                            <CircularProgress />
                        </Box> : <DialogContent>
                            <Typography sx={{ mb: 2, mt: 2 }}>Select appropiate sources to screen {screeningDialogItems?.name}</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox onChange={handleWBLChange} />} label="WORLD BANK LISTING"></FormControlLabel>
                                <FormControlLabel control={<Checkbox onChange={handleOFACChange} />} label="OFFICE OF FOREIGN ASSETS CONTROL"></FormControlLabel>
                            </FormGroup>
                            <Button onClick={executeScreening} variant="contained"
                                margin="normal">SEARCH</Button>
                        </DialogContent>}
                    </Fragment>
                    : <ScreeningResults screenResults={screenResults} failureText={failureText} validResults={validResults} doWBL={doWBL} doOFAC={doOFAC}></ScreeningResults>
                }
            </Dialog>
        </Fragment>
    )
}