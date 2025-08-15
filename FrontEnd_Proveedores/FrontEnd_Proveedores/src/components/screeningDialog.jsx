import { Box, Button, Checkbox, CircularProgress, Dialog, FormControlLabel, FormGroup, IconButton, Stack, Typography } from "@mui/material";
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
                <Stack direction={"row"}>
                    <Typography variant="h4">SUPPLIER SCREENING</Typography>
                    <IconButton disabled={isLoading}><CloseIcon onClick={handleClose} ></CloseIcon></IconButton>
                </Stack>
                {step == 1 ?
                    <Fragment>
                        {isLoading ? <CircularProgress></CircularProgress> : <Box>
                            <FormGroup>
                                <Typography variant="h5">Select appropiate sources to screen {screeningDialogItems?.name}</Typography>
                                <FormControlLabel control={<Checkbox onChange={handleWBLChange} />} label="WORLD BANK LISTING"></FormControlLabel>
                                <FormControlLabel control={<Checkbox onChange={handleOFACChange} />} label="OFFICE OF FOREIGN ASSETS CONTROL"></FormControlLabel>

                            </FormGroup>
                            <Button onClick={executeScreening} variant="contained"
                                margin="normal">SEARCH</Button>
                        </Box>}
                    </Fragment>
                    : <ScreeningResults screenResults={screenResults} failureText={failureText} validResults={validResults} doWBL={doWBL} doOFAC={doOFAC}></ScreeningResults>
                }
            </Dialog>
        </Fragment>
    )
}