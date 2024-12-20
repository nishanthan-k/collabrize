import useToggleTheme from "./lib/hooks/useToggleTheme.hook";
import Button from "./ui/Button";

function App() {
  const toggleTheme = useToggleTheme();

return (
  <div className="w-screen h-screen bg-background space-y-10 space-x-10">
    <Button content="Download" primary />
    <Button onClick={toggleTheme} secondary>
      Toggle Dark Mode
    </Button>
    <Button outlined content="Send" disabled />
  </div>
);
}

export default App;
