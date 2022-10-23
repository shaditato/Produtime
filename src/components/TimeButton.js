import { useContext, useEffect, useState } from "react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Add, Circle } from "@mui/icons-material";
import { GlobalContext } from "../context/GlobalState";
import { InvertedButton } from "./InvertedButton";

export function TimeButton(props) {
  const { createTimer, projects, getProjects } = useContext(GlobalContext);
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

  useEffect(() => {
    getProjects({ uid: "1" }); // temporary uid before implementing auth
  }, []);

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
