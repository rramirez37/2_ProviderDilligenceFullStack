
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';


export default function ScreeningTable({ data }) {

    const [headers, setHeaders] = useState([])
    const [rows, setRows] = useState([])

    const buildTable = async () => {
        console.log(data)
        if (Array.isArray(data) && data.length > 0){
        //if (data != undefined || data != null || data != '' || data != []) {
            let hds = await Object.keys(data[0])
            console.log(hds)
            setHeaders(hds)
            let rws = await data.map(item => Object.values(item))
            console.log(rws)
            setRows(rws)
        }

    }

    useEffect(() => {
        buildTable()
    }, [data])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => {
                            return <TableCell key={header}>{header}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row.map((cell, cellIndex) => {
                                return <TableCell key={cellIndex}>{cell}</TableCell>
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
