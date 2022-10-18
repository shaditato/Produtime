import { Button } from "@mui/material";

export function InvertedButton({ children, sx, ...props }) {
  return (
    <Button
      sx={{
        ...sx,
        backgroundColor: "#fff",
        color: "#1976D2",
        "&:hover": {
          backgroundColor: "#fff",
          color: "#1565C0",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
