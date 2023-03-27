import { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Stop } from "@mui/icons-material";
import { ActiveTimer } from "./ActiveTimer";
import { GlobalContext } from "../../context/GlobalState";
import { COLOURS } from "../../data/constants";

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
                  backgroundColor: COLOURS[project.colour],
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
                    disabled={timer.loading}
                    data-created={createdAtMS}
                    onClick={endTimer}
                    startIcon={
                      timer.loading ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        <Stop />
                      )
                    }
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
