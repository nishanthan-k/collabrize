import { useEffect } from "react";
import Button from "./ui/Button";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', newTheme);
};

return (
  <div className="w-screen h-screen bg-background">
    <Button content="Click me" variant="primary" />
    <button onClick={toggleDarkMode} className="text-black dark:text-white">Toggle Dark Mode</button>
  </div>
);
}

export default App;
