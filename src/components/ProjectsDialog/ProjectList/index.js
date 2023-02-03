import { useContext, useState } from "react";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add,
  Archive,
  Circle,
  ExpandLess,
  ExpandMore,
  Unarchive,
} from "@mui/icons-material";
import { GlobalContext } from "../../../context/GlobalState";
import { COLOURS } from "../../../data/constants";
import { partitionArchived } from "../../../utils";

export function ProjectList({ setDialogState }) {
  const {
    projects,
    user: { uid },
    updateProject,
  } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [active, archived] = partitionArchived(projects);

  const handleUnarchive = (id) => {
    updateProject({
      id,
      project: {
        name: projects[id].name,
        archived: false,
      },
      reason: "UNARCHIVE",
      uid,
    });
  };

  const toggleOpen = () => setOpen(!open);

  return (
    <List dense>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setDialogState("NEW")}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>New Project</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton edge="end" onClick={toggleOpen}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      >
        <ListItemButton onClick={toggleOpen}>
          <ListItemIcon>
            <Archive />
          </ListItemIcon>
          <ListItemText>Archived Projects</ListItemText>
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        {archived.length !== 0 ? (
          archived.map(([projectId, project]) => (
            <ListItem
              disablePadding
              key={projectId}
              secondaryAction={
                <Tooltip arrow placement="top" title="Unarchive">
                  <IconButton
                    edge="end"
                    onClick={() => handleUnarchive(projectId)}
                  >
                    <Unarchive />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemButton onClick={() => setDialogState(projectId)}>
                <ListItemIcon>
                  <Circle sx={{ color: COLOURS[project.colour] }} />
                </ListItemIcon>
                <ListItemText
                  primary={project.name}
                  primaryTypographyProps={{ noWrap: true }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography sx={{ paddingX: 2 }} variant="caption">
            No archived projects yet.
          </Typography>
        )}
      </Collapse>
      <Divider sx={{ marginY: 1 }} variant="middle" />
      {active.length !== 0 ? (
        active.map(([projectId, project]) => (
          <ListItem disablePadding key={projectId}>
            <ListItemButton onClick={() => setDialogState(projectId)}>
              <ListItemIcon>
                <Circle sx={{ color: COLOURS[project.colour] }} />
              </ListItemIcon>
              <ListItemText
                primary={project.name}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <Typography sx={{ paddingX: 2 }} variant="caption">
          No projects yet.
        </Typography>
      )}
    </List>
  );
}
