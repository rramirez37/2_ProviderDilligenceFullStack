import { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({dialogItems,setDeleteDialogItems}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Change")
    console.log(dialogItems)
    setOpen(dialogItems?.state)
  },[dialogItems?.state])

    const handleClose = () => {
    setDeleteDialogItems({
      data: {},
      actions : {},
      state: false
    })
    setOpen(false);
  };
  const confirm = async () => {
    await dialogItems?.actions.confirm()
    await handleClose()
    /*
    setDeleteDialogItems({
      data: {},
      actions : {},
      state: false
    })
    setOpen(false)*/
  }



  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Supplier deletion confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete {dialogItems ? dialogItems.data.companyName : ''} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={confirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
