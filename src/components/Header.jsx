import { SquareMenu } from "lucide-react";
import { useState } from "react";
import { userSignOut } from "../apifetch/user-api-fetch";
import ThemeToggleButton from "./ThemeToggleButton";
import { useNavigate } from "react-router";
import { routes } from "../utilities/routes";
import { setUser, logoutUser} from "../store/features/auth-feature";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);


  const handleLogout = async () => {
    try {
      await userSignOut();
      navigate(routes.authroutes.login, { replace: true });
      dispatch(logoutUser());

      console.log("Logout Successful");
    } catch (error) {
      console.error("Error Logging Out:", error);
    }
  };

  return (
    <header className="dark:from-gray-600 dark:via-gray-800 dark:to-gray-950 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex justify-between items-center px-4 py-4 shadow-md shadow-black dark:shadow-white relative">
      <h1 className="text-3xl font-bold dark:text-white text-black">YapApp</h1>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          <SquareMenu className="w-10 h-10 text-gray-800 dark:text-white" />
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-3 flex flex-col gap-3  transition-opacity"
            onMouseLeave={() => setMenuOpen(false)}
          >
            <ThemeToggleButton />

            {user && (
              <>
                <h1 className="text-left text-gray-800 dark:text-white font-bold cursor-pointer dark:hover:text-sky-50 hover:text-black" onClick={()=>{
                  navigate(routes.authroutes.profile)
                }}>
                  {user.firstName+" "+user.lastName}
                </h1>
                {" "}
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
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
