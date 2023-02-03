import { Delete } from "@mui/icons-material";
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";

export function DeleteTag({ handleClose, id }) {
  const {
    tags,
    user: { uid },
    deleteTag,
  } = useContext(GlobalContext);

  const handleDelete = () => {
    deleteTag({ id, name: tags[id], uid });
    handleClose();
  };

  return (
    <>
      <DialogTitle noWrap>Delete "{tags[id]}"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <Chip label={tags[id]} size="small" />
          ? This tag will be permanently removed from all associated timer
          records!
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
