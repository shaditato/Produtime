import { useContext } from "react";
import { Card, CardActionArea, Chip, Toolbar, Typography } from "@mui/material";
import { GlobalContext } from "../context/GlobalState";
import { COLOURS } from "../data/constants";
import { msToHMS } from "../utils/format";

export function TimerRecord({ timer }) {
  const { projects } = useContext(GlobalContext);

  return (
    <Card elevation={0}>
      <CardActionArea>
        <Toolbar>
          <Chip
            label={msToHMS(
              timer.endedAt.toMillis() - timer.createdAt.toMillis()
            )}
            sx={{
              backgroundColor: COLOURS[projects[timer.projectId].colour],
            }}
          />
          <Typography sx={{ marginX: 1 }}>
            {projects[timer.projectId].name}
          </Typography>
        </Toolbar>
      </CardActionArea>
    </Card>
  );
}
