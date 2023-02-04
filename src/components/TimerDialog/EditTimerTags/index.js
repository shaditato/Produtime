import { useContext, useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { GlobalContext } from "../../../context/GlobalState";
import { TagChip } from "../../TagChip";

export function EditTimerTags({ handleClose, timer }) {
  const { tags } = useContext(GlobalContext);
  const [formInput, setFormInput] = useState(timer.tags ?? []);

  const formSubmit = () => {
    // updateTimer({ id, timer, uid });
    handleClose();
  };

  const sortedTags = Object.entries(tags).sort(([_a, a], [_b, b]) =>
    a.localeCompare(b)
  );

  return (
    <>
      <DialogContent>
        <TextField
          fullWidth
          select
          SelectProps={{
            displayEmpty: true,
            multiple: true,
            renderValue: (value) => {
              if (value.length === 0)
                return <Typography variant="subtitle2">(no tags)</Typography>;
              return value.map((id) => (
                <TagChip key={`select-${id}`} label={tags[id]} />
              ));
            },
          }}
          onChange={(event) => setFormInput(event.target.value)}
          variant="standard"
          value={formInput}
        >
          {sortedTags.map(([id, tag]) => (
            <MenuItem key={id} value={id}>
              <TagChip label={tag} />
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formSubmit}>Confirm</Button>
      </DialogActions>
    </>
  );
}
