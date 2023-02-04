import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete, Label, Notes } from "@mui/icons-material";

export function TimerMenu({ setDialogState }) {
  return (
    <List dense>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setDialogState("EDIT_TAGS")}>
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText>Edit Tags</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setDialogState("EDIT_DESC")}>
          <ListItemIcon>
            <Notes />
          </ListItemIcon>
          <ListItemText>Edit Description</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setDialogState("DELETE")}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete Timer Record</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
