import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./ThemeContext";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";
import UserForm from "./pages/UserForm";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  // return (
  //   // <button
  //   //   onClick={toggleTheme}
  //   //   className={`fixed top-4 right-4 z-50 p-3 rounded-full font-bold text-lg transition-all duration-300 shadow-lg ${
  //   //     isDark 
  //   //       ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700 border-2 border-yellow-300' 
  //   //       : 'bg-yellow-300 text-gray-900 hover:bg-yellow-400 border-2 border-gray-900'
  //   //   }`}
  //   //   title={isDark ? "Switch to Light Mode (currently: Dark)" : "Switch to Dark Mode (currently: Light)"}
  //   //   aria-label="Toggle theme"
  //   // >
  //   //   {isDark ? "☀️" : "🌙"}
  //   // </button>
  // );
}

function AppContent() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/user-dashboard">
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}