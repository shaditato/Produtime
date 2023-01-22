import { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalState";
import { ActiveTimer } from "./ActiveTimer";
import { Stop } from "@mui/icons-material";

export function TimeCards() {
  const { activeTimers, projects, user, stopTimer } = useContext(GlobalContext);

  function endTimer(event) {
    stopTimer({
      ...activeTimers.find(
        (timer) =>
          timer.createdAt.toMillis() === +event.currentTarget.dataset.created
      ),
      uid: user.uid,
    });
  }

  return (
    <>
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
            const project = projects[timer.projectId] || {};
            const createdAtMS = timer.createdAt.toMillis();

            return (
              <Card
                key={createdAtMS}
                sx={{
                  backgroundColor: project.colour,
                  margin: 1,
                  width: 275,
                }}
              >
                <CardContent>
                  <ActiveTimer offsetTimestamp={createdAtMS} />
                  <Typography variant="subtitle1" color="text.secondary">
                    {project.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="inherit"
                    data-created={createdAtMS}
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
      {activeTimers.length > 0 && <Divider variant="middle" />}
    </>
  );
}
