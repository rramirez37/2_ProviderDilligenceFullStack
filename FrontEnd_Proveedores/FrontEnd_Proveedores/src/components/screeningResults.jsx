import { Accordion, AccordionDetails, AccordionSummary, Box, DialogContent, Stack, TextField, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import ScreeningTable from "./screeningTable";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ScreeningResults({ screenResults, failureText, validResults, doWBL, doOFAC }) {

    useEffect(() => {
        console.log(screenResults)
    }, [screenResults])

    return (
        <DialogContent>
            {
                !validResults ?
                    <TextField disabled read sx={{ mb: 2, mt: 2 }}>
                        {failureText}
                    </TextField> :
                    <Box>
                        <Typography sx={{ mb: 2, mt: 2 }}>Process finished with {screenResults?.content?.hits} hit(s) </Typography>
                        {
                            doWBL ? <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography >WORLD BANK LISTING</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        screenResults?.content?.wblData && screenResults?.content?.wblData?.length > 0 ?
                                            <ScreeningTable data={screenResults?.content?.wblData}></ScreeningTable> :
                                            <Typography>No hits detected</Typography>
                                    }
                                </AccordionDetails>

                            </Accordion> : <></>}
                        {doOFAC ?
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography >OFFICE OF FOREIGN ASSETS CONTROL</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        screenResults?.content?.ofacData && screenResults?.content?.ofacData?.length > 0 ?
                                            <ScreeningTable data={screenResults?.content?.ofacData}></ScreeningTable> :
                                            <Typography>No hits detected</Typography>
                                    }
                                </AccordionDetails>
                            </Accordion>
                            : <></>}


                    </Box>
            }
        </DialogContent>
    )
}

//screenResults?.content?.ofacData != undefined ? screenResults?.content?.ofacData : []

/*
<Stack>
                                <Typography >WORLD BANK LISTING</Typography>
                                {
                                    screenResults?.content?.wblData && screenResults?.content?.wblData?.length > 0 ?
                                    <ScreeningTable data={screenResults?.content?.wblData}></ScreeningTable> :
                                    <Typography>No hits detected</Typography>
                                }
                            </Stack>

*/