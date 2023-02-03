import { useContext } from "react";
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { GlobalContext } from "../../../context/GlobalState";
import { Box } from "@mui/system";

export function TagList({ setDialogState }) {
  const { tags } = useContext(GlobalContext);

  const sortedTags = Object.entries(tags).sort(([_a, a], [_b, b]) =>
    a.localeCompare(b)
  );

  return (
    <List dense>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setDialogState("NEW")}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>New Tag</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ marginY: 1 }} variant="middle" />
      {sortedTags.length !== 0 ? (
        <Box sx={{ paddingX: 1, textAlign: "center" }}>
          {sortedTags.map(([tagId, tag]) => (
            <Chip
              icon={<Edit />}
              key={tagId}
              label={tag}
              onClick={() => setDialogState(tagId)}
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
      ) : (
        <Typography sx={{ paddingX: 2 }} variant="caption">
          No tags yet.
        </Typography>
      )}
    </List>
  );
}
