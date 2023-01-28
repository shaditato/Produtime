import { useContext, useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Circle } from "@mui/icons-material";
import { GlobalContext } from "../../../context/GlobalState";
import { COLOURS } from "../../../data/constants";

export function ProjectForm({ handleClose, id }) {
  const {
    projects,
    user: { uid },
    createProject,
    updateProject,
  } = useContext(GlobalContext);
  const [formInput, setFormInput] = useState({});

  const formSubmit = () => {
    if (projects[id]) {
      updateProject({
        id,
        name: formInput.name ?? projects[id].name,
        colour: formInput.colour ?? projects[id].colour,
        uid,
      });
    } else {
      if (formInput.name === undefined || formInput.colour === undefined) {
        return;
      }
      createProject({
        name: formInput.name,
        colour: formInput.colour,
        uid,
      });
    }
    handleClose();
  };

  return (
    <>
      <DialogTitle>
        {projects[id] ? "Edit Project" : "Create New Project"}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", gap: 1 }}>
        <Select
          defaultValue={projects[id]?.colour ?? ""}
          displayEmpty
          onChange={(event) =>
            setFormInput({ ...formInput, colour: event.target.value })
          }
          renderValue={(value) => {
            return (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Circle sx={{ color: COLOURS[value] ?? "lightgray" }} />
              </Box>
            );
          }}
          required
          variant="standard"
        >
          {Object.entries(COLOURS).map(([colourKey, hex]) => (
            <MenuItem key={colourKey} value={colourKey}>
              <Circle sx={{ color: hex }} />
            </MenuItem>
          ))}
        </Select>
        <TextField
          defaultValue={projects[id]?.name ?? ""}
          onChange={(event) =>
            setFormInput({ ...formInput, name: event.target.value })
          }
          placeholder="My Project Name"
          required
          sx={{
            transform: "translateY(1px)",
          }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formSubmit}>Confirm</Button>
      </DialogActions>
    </>
  );
}
