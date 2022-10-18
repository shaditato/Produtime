import { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalState";
import { Timer } from "./Timer";
import { Stop } from "@mui/icons-material";
import { styled } from "@mui/system";

const Container = styled(Box)({
  backgroundColor: "red",
  display: "flex",
  flex: 1,
  padding: 1,
  overflow: "auto",
  scrollbarWidth: 0,
});

export function TimeCards() {
  const { activeTimers, projects, stopTimer } = useContext(GlobalContext);

  function endTimer(event) {
    console.log({ activeTimers });
    console.log({ createdAt: event.currentTarget.dataset.created });
    stopTimer({ createdAt: event.currentTarget.dataset.created });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        padding: 1,
        overflow: "auto",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "10px",
          backgroundColor: "#D3D3D3",
        },
      }}
    >
      <Box sx={{ display: "flex", minHeight: "min-content" }}>
        {activeTimers.map((timer) => (
          <Card
            key={timer.createdAt}
            sx={{
              backgroundColor: projects[timer.projectId].colour,
              margin: 1,
              width: 275,
            }}
          >
            <CardContent>
              <Timer offsetTimestamp={timer.createdAt} />
              <Typography variant="subtitle1" color="text.secondary">
                {projects[timer.projectId].name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="inherit"
                data-created={timer.createdAt}
                onClick={endTimer}
                startIcon={<Stop />}
              >
                Stop Timer
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
