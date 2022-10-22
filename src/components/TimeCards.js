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

export function TimeCards() {
  const { activeTimers, projects, stopTimer } = useContext(GlobalContext);

  function endTimer(event) {
    stopTimer({
      ...activeTimers.find(
        (timer) => timer.createdAt === +event.currentTarget.dataset.created
      ),
      uid: 1,
    });
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
        {activeTimers.map((timer) => {
          const project = projects.find(
            (project) => project.id === timer.projectId
          );

          return (
            <Card
              key={timer.createdAt}
              sx={{
                backgroundColor: project.colour,
                margin: 1,
                width: 275,
              }}
            >
              <CardContent>
                <Timer offsetTimestamp={timer.createdAt} />
                <Typography variant="subtitle1" color="text.secondary">
                  {project.name}
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
          );
        })}
      </Box>
    </Box>
  );
}
