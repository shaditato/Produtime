import { useContext, useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { GlobalContext } from "../../../../context/GlobalState";

export function EditTag({ handleClose, handleDelete, id }) {
  const {
    tags,
    user: { uid },
    createTag,
    updateTag,
  } = useContext(GlobalContext);
  const [formInput, setFormInput] = useState("");

  const formSubmit = () => {
    if (!formInput) return;
    if (tags[id]) {
      updateTag({
        id,
        name: formInput,
        uid,
      });
    } else {
      createTag({ name: formInput, uid });
    }
    handleClose();
  };

  return (
    <>
      <DialogTitle>
        {id === "NEW_TAG" ? "Create New Tag" : "Edit Tag"}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", gap: 1 }}>
        <TextField
          defaultValue={tags[id] ?? ""}
          onChange={(event) => setFormInput(event.target.value)}
          placeholder="My Tag Name"
          required
          variant="standard"
        />
        {id !== "NEW" && (
          <Tooltip arrow placement="top" title="Delete Tag">
            <IconButton onClick={handleDelete} sx={{ margin: 0 }}>
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formSubmit}>Confirm</Button>
      </DialogActions>
    </>
  );
}
