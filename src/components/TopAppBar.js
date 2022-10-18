import { AccountCircle, List } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { TimeButton } from "./TimeButton";
import { InvertedButton } from "./InvertedButton";

export function TopAppBar() {
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Produtime
        </Typography>
        <TimeButton sx={{ marginX: 1 }} />
        <InvertedButton
          sx={{ marginX: 1 }}
          startIcon={<List />}
          variant="contained"
        >
          Projects
        </InvertedButton>
        <IconButton>
          <AccountCircle sx={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
