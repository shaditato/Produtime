import { useContext, useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { Archive, Circle } from "@mui/icons-material";
import { GlobalContext } from "../../../../context/GlobalState";
import { COLOURS } from "../../../../data/constants";

export function EditProject({ handleClose, id }) {
  const {
    projects,
    user: { uid },
    createProject,
    updateProject,
  } = useContext(GlobalContext);
  const [formInput, setFormInput] = useState({});

  const formSubmit = () => {
    const { name, colour } = formInput;

    if (projects[id]) {
      updateProject({
        id,
        project: {
          name: name ?? projects[id].name,
          ...(colour ? { colour } : {}),
        },
        reason: "EDIT",
        uid,
      });
    } else {
      if (name === undefined || colour === undefined) return;
      createProject({
        name,
        colour,
        uid,
      });
    }
    handleClose();
  };

  const handleArchive = (id) => {
    updateProject({
      id,
      project: {
        name: projects[id]?.name,
        archived: true,
      },
      reason: "ARCHIVE",
      uid,
    });
    handleClose();
  };

  return (
    <>
      <DialogTitle>
        {id === "NEW" ? "Create New Project" : "Edit Project"}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", gap: 1 }}>
        <TextField
          defaultValue={projects[id]?.colour ?? ""}
          onChange={(event) =>
            setFormInput({ ...formInput, colour: event.target.value })
          }
          required
          select
          SelectProps={{
            displayEmpty: true,
            renderValue: (value) => {
              return (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Circle
                    fontSize="small"
                    sx={{ color: COLOURS[value] ?? "lightgray" }}
                  />
                </Box>
              );
            },
          }}
          variant="standard"
        >
          {Object.entries(COLOURS).map(([colourKey, hex]) => (
            <MenuItem key={colourKey} value={colourKey}>
              <Circle sx={{ color: hex }} />
            </MenuItem>
          ))}
        </TextField>
        <TextField
          defaultValue={projects[id]?.name ?? ""}
          onChange={(event) =>
            setFormInput({ ...formInput, name: event.target.value })
          }
          placeholder="My Project Name"
          required
          variant="standard"
        />
        {id !== "NEW" && (
          <Tooltip arrow placement="top" title="Archive Project">
            <IconButton onClick={() => handleArchive(id)} sx={{ margin: 0 }}>
              <Archive />
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
