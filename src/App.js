import { TimeCards } from "./components/TimeCards";
import { Timers } from "./components/Timers";
import { TopAppBar } from "./components/TopAppBar";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <TopAppBar />
      <TimeCards />
      <Timers />
    </GlobalProvider>
  );
}

export default App;
