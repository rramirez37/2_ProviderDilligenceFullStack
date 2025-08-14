import Dialog from "@mui/material/Dialog"
import TextField from "@mui/material/TextField"
import { useState, useEffect } from "react"
import DataDialog from "./dataDialog"
import { updateSupplier } from "../api/supplierApi";

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

    const update = async (id,supplier) => {
        delete supplier.country;
        await updateSupplier(id,supplier,token)
        await dialogItems?.actions.reload()
        await handleClose();
    }

return (
    <DataDialog type={'edit'} isOpen={open} editSupplier={dialogItems.data} onClickSpecificOperation={update} countryList={countryList}>
    </DataDialog>
)
}