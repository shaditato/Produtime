import { useContext, useEffect } from "react";
import { Card, CardActionArea, Chip, Toolbar, Typography } from "@mui/material";
import { GlobalContext } from "../context/GlobalState";
import { msToHMS } from "../utils/format";

export function Timers() {
  const { projects, timers, getTimers } = useContext(GlobalContext);

  useEffect(() => {
    getTimers({ uid: 1 }); // temporary uid before implementing auth
  }, []);

  return (
    <>
      {timers.map((timer) => (
        <Card elevation={0}>
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
    </>
  );
}
