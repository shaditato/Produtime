import { useContext, useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Add, Circle } from "@mui/icons-material";
import { GlobalContext } from "../context/GlobalState";
import { COLOURS } from "../data/constants";

export function ProjectsDialog({ handleClose }) {
  const {
    projects,
    user: { uid },
    createProject,
    updateProject,
  } = useContext(GlobalContext);
  /**
   * PROJECT_LIST: Display list of projects
   * NEW_PROJECT: Provide dialog form to create new project
   * [PROJECT_ID]: Provide dialog form to edit existing project w/ ID
   */
  const [dialogState, setDialogState] = useState("PROJECT_LIST");
  const [formInput, setFormInput] = useState({});

  const formSubmit = () => {
    if (projects[dialogState]) {
      updateProject({
        id: dialogState,
        name: formInput.name ?? projects[dialogState].name,
        colour: formInput.colour ?? projects[dialogState].colour,
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
      {dialogState === "PROJECT_LIST" ? (
        <>
          <DialogTitle>Manage Projects</DialogTitle>
          <List sx={{ pt: 0 }}>
            <ListItem disableGutters>
              <ListItemButton onClick={() => setDialogState("NEW_PROJECT")}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText>New Project</ListItemText>
              </ListItemButton>
            </ListItem>
            {Object.entries(projects).map(([projectId, project]) => (
              <ListItem disableGutters key={projectId}>
                <ListItemButton onClick={() => setDialogState(projectId)}>
                  <ListItemIcon>
                    <Circle sx={{ color: COLOURS[project.colour] }} />
                  </ListItemIcon>
                  <ListItemText>{project.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <DialogTitle>
            {projects[dialogState] ? "Edit Project" : "Create New Project"}
          </DialogTitle>
          <DialogContent sx={{ display: "flex", gap: 1 }}>
            <Select
              defaultValue={projects[dialogState]?.colour ?? ""}
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
              defaultValue={projects[dialogState]?.name ?? undefined}
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
      )}
    </>
  );
}

// <Select
// renderValue={(value) => {
//   return (
//     <Box sx={{ display: "flex", gap: 1 }}>
//       <SvgIcon color="primary">
//         <Circle sx={{ backgroundColor: "red" }} />
//       </SvgIcon>
//       jdlksajdklajsdlkj
//     </Box>
//   );
// }}
//   label="Colour"
//   variant="standard"
// >
//   <MenuItem value={10}>ndsand,sandsamnd</MenuItem>
// </Select>
