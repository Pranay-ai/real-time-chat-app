import { SquareMenu } from "lucide-react";
import { useState } from "react";
import { userSignOut } from "../apifetch/user-api-fetch";
import ThemeToggleButton from "./ThemeToggleButton";
import { useNavigate } from "react-router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userSignOut();
      navigate("/sign-in", {replace:true});

      console.log("Logout Successful");
    } catch (error) {
      console.error("Error Logging Out:", error);
    }
  }

  return (
    <header className="dark:bg-black bg-amber-50 flex justify-between items-center px-4 py-4 shadow-md shadow-black dark:shadow-white relative">

      <h1 className="text-3xl font-bold dark:text-white text-black">YapApp</h1>

      <div className="relative">

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          <SquareMenu className="w-10 h-10 text-gray-800 dark:text-white"  />
        </button>

 
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-3 flex flex-col gap-3 transition-opacity" onMouseLeave={()=>setMenuOpen(false)}>
            <ThemeToggleButton />
            <button
              onClick={() => console.log("Settings Clicked")} 
              className="text-left text-gray-800 dark:text-white px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              Settings
            </button>
            <button
              onClick={() => handleLogout()}
              className="text-left text-red-600 dark:text-red-400 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer "
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
