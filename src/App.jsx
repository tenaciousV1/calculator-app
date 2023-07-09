import { ThemeProvider } from "./ThemeContext";
import Calculator from "./components/Calculator";

function App() {
  return (
    <>
      <ThemeProvider>
        <Calculator></Calculator>
      </ThemeProvider>
    </>
  );
}

export default App;
