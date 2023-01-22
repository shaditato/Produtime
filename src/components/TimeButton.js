import { useContext, useState } from "react";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Add, Circle, Settings } from "@mui/icons-material";
import { GlobalContext } from "../context/GlobalState";
import { InvertedButton } from "./InvertedButton";

export function TimeButton(props) {
  const { createTimer, projects } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function startTimer(event) {
    handleClose();
    createTimer({ projectId: event.currentTarget.dataset.id });
  }

  return (
    <>
      <InvertedButton
        onClick={handleClick}
        startIcon={<Add />}
        variant="contained"
        {...props}
      >
        New Timer
      </InvertedButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Manage Projects
        </MenuItem>
        <Divider variant="middle" />
        {Object.entries(projects).map(([projectId, project]) => (
          <MenuItem data-id={projectId} key={projectId} onClick={startTimer}>
            <ListItemIcon>
              <Circle sx={{ color: project.colour }} />
            </ListItemIcon>
            {project.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
