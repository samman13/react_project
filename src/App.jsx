import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App
