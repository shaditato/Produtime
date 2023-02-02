import { Delete } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";

export function DeleteProject({ handleClose, id }) {
  const {
    projects,
    timers,
    user: { uid },
    deleteProject,
  } = useContext(GlobalContext);

  const timerDeleteIds = timers.reduce(
    (accumulator, timer) =>
      timer.projectId === id ? [timer.id, ...accumulator] : accumulator,
    []
  );

  const handleDelete = () => {
    const { name } = projects[id];
    deleteProject({ id, name, uid });
    handleClose();
  };

  return (
    <>
      <DialogTitle noWrap>Delete "{projects[id].name}"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this project? All associated timer
          records ({timerDeleteIds.length}) will be lost forever!
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
