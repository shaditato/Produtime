import { useState } from "react";
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { Info } from "@mui/icons-material";

export function EditTimerDesc({ handleClose, timer }) {
  const [formInput, setFormInput] = useState(timer.desc ?? "");

  const formSubmit = () => {
    // updateTimer({ id, timer, uid });
    handleClose();
  };

  return (
    <>
      <DialogContent>
        <TextField
          defaultValue={timer.desc ?? ""}
          fullWidth
          multiline
          onChange={(event) => setFormInput(event.target.value)}
          placeholder="Add a description"
          maxRows={12}
          required
          variant="standard"
        />
        {formInput.length > 500 && (
          <Chip
            icon={<Info />}
            label="Keep it brief!"
            size="small"
            sx={{ marginY: 1 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formSubmit}>Confirm</Button>
      </DialogActions>
    </>
  );
}
