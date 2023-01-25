import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { InvertedButton } from "./InvertedButton";
import { TimeCards } from "./TimeCards";
import { Timers } from "./Timers";
import { TopAppBar } from "./TopAppBar";
import { GlobalContext } from "../context/GlobalState";
import { signInWithGoogle } from "../firebase/config";

export function SignIn() {
  const { user } = useContext(GlobalContext);

  return (
    <>
      {user ? (
        <>
          <TopAppBar />
          <Box
            sx={{
              height: "calc(100vh - 64px)",
              overflowY: "scroll",
            }}
          >
            <TimeCards />
            <Timers />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "#1976D2",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              justifyContent: "center",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h3" sx={{ color: "#fff" }}>
              Produtime
            </Typography>
            <Typography sx={{ color: "#fff", marginY: 1 }}>
              Keep track of the time you spend being productive
            </Typography>
            <InvertedButton
              onClick={signInWithGoogle}
              startIcon={<Google />}
              sx={{ marginY: 1 }}
              variant="outline"
            >
              Sign In with Google
            </InvertedButton>
          </Box>
        </>
      )}
    </>
  );
}
