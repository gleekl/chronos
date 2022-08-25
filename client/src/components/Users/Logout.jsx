import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Logout = ({ handleLogout }) => {
  const [open, setOpen] = useState(true)

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(-1)
  }

  const handleAgree = async () => {
    handleLogout()
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>Log Out</Button> */}
      <Dialog
        open={open}
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you wish to log out?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleAgree} variant="contained" autoFocus>Yes, log out</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Logout