import { ToastProvider } from "use-toast-mui";
import { SignIn } from "./components/SignIn";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <ToastProvider>
      <GlobalProvider>
        <SignIn />
      </GlobalProvider>
    </ToastProvider>
  );
}

export default App;
