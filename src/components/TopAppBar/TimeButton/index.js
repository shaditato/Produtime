import { useContext, useState } from "react";
import { Dialog, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Add, Circle, Settings } from "@mui/icons-material";
import { InvertedButton } from "../../InvertedButton";
import { ProjectsDialog } from "../../ProjectsDialog";
import { GlobalContext } from "../../../context/GlobalState";
import { COLOURS } from "../../../data/constants";

export function TimeButton(props) {
  const { createTimer, projects } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    handleClose();
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
      <Menu
        anchorEl={anchorEl}
        disableScrollLock
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDialogOpen}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Manage Projects
        </MenuItem>
        {Object.keys(projects).length !== 0 && <Divider variant="middle" />}
        {Object.entries(projects).map(([projectId, project]) => (
          <MenuItem data-id={projectId} key={projectId} onClick={startTimer}>
            <ListItemIcon>
              <Circle sx={{ color: COLOURS[project.colour] }} />
            </ListItemIcon>
            {project.name}
          </MenuItem>
        ))}
      </Menu>
      <Dialog onClose={handleDialogClose} open={dialogOpen} scroll="body">
        <ProjectsDialog handleClose={handleDialogClose} />
      </Dialog>
    </>
  );
}
