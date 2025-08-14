import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllSuppliers } from '../api/supplierApi';
import OptionsButtons from './optionsButtons';
import Button from '@mui/material/Button';

const columns = [
    { id: 'companyName', label: 'Company Name', minWidth: 100 },
    { id: 'commercialName', label: 'Commercial Name', minWidth: 100 },
    { id: 'taxIdentifier', label: 'Tax Identifier', minWidth: 100 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'website', label: 'Website', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'annualBilling', label: 'Annual Billing ($)', minWidth: 100 },
    { id: 'lastEditedDateTime', label: 'Last Edited', minWidth: 100 },
    { id: 'options', label: 'Options', minWidth: 100 },
];

export default function SupplierTable({ token }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [supplierData, setSupplierData] = useState([]);

    const formatData = async (data) => {
        const newData = data.map(row => {
            return {
                companyName: row.companyName,
                commercialName: row.commercialName,
                taxIdentifier: row.taxIdentifier,
                phoneNumber: row.phoneNumber,
                email: row.email,
                website: row.website,
                address: row.address,
                country: row.countryId,
                annualBilling: row.annualBilling,
                lastEditedDateTime: row.lastEditedDateTime
            }
        })
        return newData;
    }

    const getDataFromTable = async () => {
        let data = await getAllSuppliers(token);
        let newData = await formatData(data)
        setSupplierData(newData)
        console.log(data);
    }

    useEffect(() => {
        getDataFromTable();
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {supplierData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                const lastColumn = index === columns.length - 1;
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {lastColumn ? (<OptionsButtons></OptionsButtons>) : (column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={supplierData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Button>
                    Register New Supplier
                </Button>
        </>

    );
}
