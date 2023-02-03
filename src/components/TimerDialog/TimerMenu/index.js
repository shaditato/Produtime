import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export function TimerMenu() {
  return (
    <List dense>
      <ListItem disableGutters>
        <ListItemButton>
          <ListItemText>Edit Tags</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disableGutters>
        <ListItemButton>
          <ListItemText>Edit Description</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disableGutters>
        <ListItemButton>
          <ListItemText>Delete Timer Record</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
