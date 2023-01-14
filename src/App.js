import { SignIn } from "./components/SignIn";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <SignIn />
    </GlobalProvider>
  );
}

export default App;
