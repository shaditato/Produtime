import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete, Label, Notes } from "@mui/icons-material";

export function TimerMenu() {
  return (
    <List dense>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText>Edit Tags</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Notes />
          </ListItemIcon>
          <ListItemText>Edit Description</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete Timer Record</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
