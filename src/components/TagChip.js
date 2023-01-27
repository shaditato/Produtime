import { Chip } from "@mui/material";

export function TagChip({ sx = {}, ...props }) {
  return <Chip size="small" sx={{ margin: 0.5, ...sx }} {...props} />;
}
