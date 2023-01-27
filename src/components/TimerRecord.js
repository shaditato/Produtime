import { useContext, useState } from "react";
import {
  Card,
  CardActionArea,
  Chip,
  Dialog,
  Toolbar,
  Typography,
} from "@mui/material";
import { TimerDialog } from "./TimerDialog";
import { GlobalContext } from "../context/GlobalState";
import { COLOURS } from "../data/constants";
import { msToHMS } from "../utils/format";
import { useLongPress } from "use-long-press";

export function TimerRecord({ timer }) {
  const { projects } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const bind = useLongPress(() => setOpen(true));

  const handleClose = () => setOpen(false);

  return (
    <>
      <Card elevation={0}>
        <CardActionArea {...bind()}>
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
      <Dialog onClose={handleClose} open={open}>
        <TimerDialog timer={timer} />
      </Dialog>
    </>
  );
}
