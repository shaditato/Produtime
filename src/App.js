import { TimeCards } from "./components/TimeCards";
import { TopAppBar } from "./components/TopAppBar";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <TopAppBar />
      <TimeCards />
    </GlobalProvider>
  );
}

export default App;
