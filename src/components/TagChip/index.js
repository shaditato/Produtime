import { Chip } from "@mui/material";

export function TagChip({ noMargin = false, sx = {}, ...props }) {
  return (
    <Chip
      size="small"
      sx={{ ...(noMargin ? {} : { margin: 0.5 }), ...sx }}
      {...props}
    />
  );
}
