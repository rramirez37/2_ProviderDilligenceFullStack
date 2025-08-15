import { Fragment } from "react";
import DataDialog from "./dataDialog";
import { createSupplier } from "../api/supplierApi";
import { formatInTimeZone } from 'date-fns-tz';

export default function CreateDialog({ createDialogOpen, setCreateDialogOpen, token, countryList, reload }) {
    //ITEM

    //CREATE FUNCTION
    const create = async (supplier) => {
        delete supplier.country
        supplier.lastEditedDateTime = new Date()
        let result = await createSupplier(supplier, token)
        console.log(result)
        if (Object.keys(result).length != 0) {
            console.log("Created ", result)
            console.log(reload)
            await reload.actions()
            setCreateDialogOpen(false)
        } else {
            //Trigger all possible errors
        }
    }

    const handleClose = () => {
        setCreateDialogOpen(false)
    }
    return (
        <Fragment>
            <DataDialog type={'create'} isOpen={createDialogOpen} onClickSpecificOperation={create} countryList={countryList} handleClose={handleClose}>
            </DataDialog>
        </Fragment>
    )



}