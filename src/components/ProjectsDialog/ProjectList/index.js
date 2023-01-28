import { useContext } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Add, Circle } from "@mui/icons-material";
import { GlobalContext } from "../../../context/GlobalState";
import { COLOURS } from "../../../data/constants";

export function ProjectList({ setDialogState }) {
  const { projects } = useContext(GlobalContext);

  return (
    <List dense>
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
  );
}
