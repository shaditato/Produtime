import { useContext } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { TagChip } from "../../TagChip";
import { GlobalContext } from "../../../context/GlobalState";

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
            <TagChip
              icon={<Edit />}
              key={tagId}
              label={tag}
              onClick={() => setDialogState(tagId)}
              size="medium"
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
