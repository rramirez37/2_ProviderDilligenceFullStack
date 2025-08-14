import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function OptionsButtons({ assignedRow, setSelectedSupplier, setDeleteDialogItems,setEditDialogItems, deleteItem, token, reloadTable }) {


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

    const onScreeningClick = () => {

    }

    return (<>
        <IconButton onClick={onEditClick}>
            <EditIcon></EditIcon>
        </IconButton>
        <IconButton onClick={onDeleteClick}>
            <DeleteIcon></DeleteIcon>
        </IconButton>
        <IconButton onClick={onScreeningClick}>
            <VisibilityIcon></VisibilityIcon>
        </IconButton>
    </>)
}