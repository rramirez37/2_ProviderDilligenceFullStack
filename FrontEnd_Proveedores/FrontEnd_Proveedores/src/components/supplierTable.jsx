import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { createSupplier, deleteSupplier, getAllSuppliers } from '../api/supplierApi';
import OptionsButtons from './optionsButtons';
import Button from '@mui/material/Button';
import EditDialog from './editDialog';
import { getCountries } from '../api/countryApi';
import { formatInTimeZone } from 'date-fns-tz';
import { Link } from '@mui/material';

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

export default function SupplierTable({ setReload, countryList, setCountryList, token, setDeleteDialogItems, setEditDialogItems, setCreateDialogOpen,setScreeningDialogItems,timezone }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [supplierData, setSupplierData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState({});

    const formatData = async (data, countries) => {
        console.log(data)
        const newData = data.map(row => {
            return {
                id: row.id,
                companyName: row.companyName,
                commercialName: row.commercialName,
                taxIdentifier: row.taxIdentifier,
                phoneNumber: row.phoneNumber,
                email: row.email,
                website: row.website,
                address: row.address,
                country: countries.find(ctr => ctr.id == row.countryId).name,
                countryId: row.countryId,
                annualBilling: row.annualBilling,
                lastEditedDateTime: formatInTimeZone(row.lastEditedDateTime,timezone,'yyyy-MM-dd HH:mm:ss')
            }
        })
        //console.log(newData.sort((a,b) => {return Date(a.lastEditedDateTime) - Date(b.lastEditedDateTime)}))
        let sortedData = newData.sort((a,b) => {
            console.log(Date(b.lastEditedDateTime) - Date(a.lastEditedDateTime))
            return b.lastEditedDateTime.localeCompare(a.lastEditedDateTime)})
        console.log(sortedData)
        return sortedData
    }

    const getDataFromTable = async () => {
        let countries = await getCountries(token)
        await setCountryList(countries)
        let data = await getAllSuppliers(token)
        let newData = await formatData(data, countries)
        setSupplierData(newData)
        console.log(data)
    }

    const deleteItem = async (id, token) => {
        let response = await deleteSupplier(id, token);
        if (!response) console.log("Could not delete")
        else console.log("Item deleted")
    }

    useEffect(() => {
        getDataFromTable();
        setReload(
            {
                actions: async () => {
                    getDataFromTable()
                },
            })
    }, [])

    useEffect(() => {
        console.log(selectedSupplier)
    }, [selectedSupplier])

    useEffect(() => {
        console.log(supplierData)
    },[supplierData])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const onCreateClick = () => {
        setCreateDialogOpen(true)
    }

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
                                                const isLink = column.id == 'website'
                                                return (
                                                    isLink ?
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Link
                                                            href={"http://" + value}
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                        >
                                                            {value}
                                                        </Link>
                                                    </TableCell> :
                                                    <TableCell key={column.id} align={column.align}>
                                                        {lastColumn ? (<OptionsButtons
                                                            token={token}
                                                            assignedRow={row}
                                                            setSelectedSupplier={setSelectedSupplier}
                                                            setDeleteDialogItems={setDeleteDialogItems}
                                                            setEditDialogItems={setEditDialogItems}
                                                            setScreeningDialogItems={setScreeningDialogItems}
                                                            deleteItem={deleteItem}
                                                            reloadTable={getDataFromTable}
                                                        ></OptionsButtons>) : (
                                                            value instanceof Date ?
                                                            formatInTimeZone(value,timezone,'yyyy-MM-dd HH:mm:ss')
                                                            :column.format && typeof value === 'number'
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
            <Button onClick={onCreateClick}>
                Register New Supplier
            </Button>

        </>

    );
}
