import { Box, Stack, TextField, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import ScreeningTable from "./screeningTable";


export default function ScreeningResults({ screenResults, failureText, validResults, doWBL, doOFAC }) {

    useEffect(() => {
        console.log(screenResults)
    }, [screenResults])

    return (
        <Fragment>
            {
                !validResults ?
                    <TextField disabled>
                        {failureText}
                    </TextField> :
                    <Box>
                        <Typography>Process finished with {screenResults?.content?.hits} hit(s) </Typography>
                        {
                            doWBL ? <Stack>
                                <Typography >WORLD BANK LISTING</Typography>
                                {
                                    screenResults?.content?.wblData && screenResults?.content?.wblData?.length > 0 ?
                                    <ScreeningTable data={screenResults?.content?.wblData}></ScreeningTable> :
                                    <Typography>No hits detected</Typography>
                                }
                            </Stack> : <></>}
                        {doOFAC ?
                            <Stack>
                                <Typography>OFFICE OF FOREIGN ASSETS CONTROL</Typography>
                                {
                                    screenResults?.content?.ofacData && screenResults?.content?.ofacData?.length > 0 ?
                                    <ScreeningTable data={screenResults?.content?.ofacData}></ScreeningTable> :
                                    <Typography>No hits detected</Typography>
                                }
                            </Stack>
                            : <></>}


                    </Box>
            }
        </Fragment>
    )
}

//screenResults?.content?.ofacData != undefined ? screenResults?.content?.ofacData : []