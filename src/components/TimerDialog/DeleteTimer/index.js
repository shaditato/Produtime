import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export function DeleteTimer({ handleClose, id }) {
  const handleDelete = () => {
    // deleteTimer({ id, uid });
    handleClose();
  };

  return (
    <>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this timer record? It'll be lost
          forever!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          color="error"
          onClick={handleDelete}
          startIcon={<Delete />}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}
