import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ThemeProvider from "./themes";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
