import { useContext, useState } from "react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Add, Circle } from "@mui/icons-material";
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
        {projects.map((project, i) => (
          <MenuItem data-id={i} key={i} onClick={startTimer}>
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
