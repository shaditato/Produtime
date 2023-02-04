import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { AccountButton } from "./AccountButton";
import { TimeButton } from "./TimeButton";

export function TopAppBar() {
  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar>
        <Typography component="div" noWrap variant="h6">
          Produtime
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: 0,
          }}
        >
          <TimeButton sx={{ marginX: 1 }} />
          <AccountButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
