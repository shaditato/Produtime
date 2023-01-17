import { useContext, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Toolbar,
  Typography,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalState";
import { msToHMS } from "../utils/format";

export function Timers() {
  const { projects, timers, user, getTimers } = useContext(GlobalContext);

  useEffect(() => {
    getTimers({ uid: user.uid });
  }, []);

  // Create an object to map timers to date strings
  const datedTimers = timers.reduce((accumulator, timer) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(timer.createdAt).toLocaleDateString(
      undefined,
      options
    );

    if (accumulator[date] === undefined) {
      return {
        ...accumulator,
        [date]: [timer],
      };
    }

    return {
      ...accumulator,
      [date]: [timer, ...accumulator[date]],
    };
  }, {});

  return (
    <>
      {Object.keys(datedTimers).map((date) => (
        <Box key={date}>
          <Typography sx={{ marginX: 3 }} variant="overline">
            {date}
          </Typography>
          {datedTimers[date].map((timer) => (
            <Card elevation={0} key={timer.createdAt}>
              <CardActionArea>
                <Toolbar>
                  <Chip
                    label={msToHMS(timer.endedAt - timer.createdAt)}
                    sx={{ backgroundColor: projects[timer.projectId].colour }}
                  />
                  <Typography sx={{ marginX: 1 }}>
                    {projects[timer.projectId].name}
                  </Typography>
                </Toolbar>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      ))}
    </>
  );
}
