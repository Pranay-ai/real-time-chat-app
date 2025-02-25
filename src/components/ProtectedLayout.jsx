import { Outlet } from "react-router";
import Header from "./Header";
import MainChat from "./MainChat";

export default function ProtectedLayout() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="absolute bottom-0  right-0 bg-white dark:bg-gray-800 shadow-t z-10">
        <MainChat />
      </div>
    </div>
  );
}
