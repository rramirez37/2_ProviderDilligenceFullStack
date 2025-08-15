import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import getWebscrapping from "../api/wscApi";


export default function OptionsButtons({ assignedRow, setSelectedSupplier, setDeleteDialogItems,setEditDialogItems,setScreeningDialogItems, deleteItem, token, reloadTable }) {



    const onEditClick = () => {
        setSelectedSupplier(assignedRow)
        setEditDialogItems({
            data: assignedRow,
            actions: {
                reload: async () => {
                    //await updateSupplier(assignedRow.id, token) will be implemented in another function
                    reloadTable()
                }, 
                update: async () => {
                    
                }

            },
            state: true
        })
    }

    const onDeleteClick = async () => {
        console.log("Click!")
        setSelectedSupplier(assignedRow)
        setDeleteDialogItems({
            data: assignedRow,
            actions: {
                confirm: async () => {
                    await deleteItem(assignedRow.id, token)
                    reloadTable()
                },
            },
            state: true
        })
    }

    const onScreeningClick = async () => {
        setSelectedSupplier(assignedRow)
        console.log(assignedRow)
        setScreeningDialogItems({
            name: assignedRow.companyName,
            state: true
        })
        /*
        let companyName = assignedRow.companyName
        let screenResult = await getWebscrapping(companyName,true,false)
        console.log(screenResult)
        */
    }

    return (<>
        <IconButton onClick={onEditClick} title="View and Edit">
            <EditIcon></EditIcon>
        </IconButton>
        <IconButton onClick={onDeleteClick} title="Delete">
            <DeleteIcon></DeleteIcon>
        </IconButton>
        <IconButton onClick={onScreeningClick} title="Screening">
            <VisibilityIcon></VisibilityIcon>
        </IconButton>
    </>)
}