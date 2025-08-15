import Dialog from "@mui/material/Dialog"
import TextField from "@mui/material/TextField"
import { useState, useEffect, Fragment } from "react"
import DataDialog from "./dataDialog"
import { updateSupplier } from "../api/supplierApi";
import { formatInTimeZone } from 'date-fns-tz';

export default function EditDialog({ dialogItems, setEditDialogItems, token, countryList }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("Change")
        console.log(dialogItems)
        setOpen(dialogItems?.state)
    }, [dialogItems?.state])

    const handleClose = () => {
        setEditDialogItems({
            data: {},
            actions: {},
            state: false
        })
        setOpen(false);
    }

    const update = async (id, supplier) => {
        let newSupplier = supplier
        delete newSupplier.country;
        newSupplier.lastEditedDateTime = new Date()
        await updateSupplier(id, newSupplier, token)
        await dialogItems?.actions.reload()
        await handleClose();
    }

    return (
        <Fragment>
            <DataDialog type={'edit'} isOpen={open} editSupplier={dialogItems.data} onClickSpecificOperation={update} countryList={countryList} handleClose={handleClose}>
            </DataDialog>
        </Fragment>

    )
}