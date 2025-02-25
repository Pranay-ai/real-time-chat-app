import { Outlet } from "react-router";
import Header from "./Header";

export default function PublicLayout() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  );
}
