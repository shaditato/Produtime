import { useContext, useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { GlobalContext } from "../../../context/GlobalState";

export function AccountButton() {
  const { user, signOut } = useContext(GlobalContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar src={user.photoURL} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        disableScrollLock
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}
