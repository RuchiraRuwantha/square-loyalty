"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "./Button";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("account_id"); // clear session
    Cookies.remove("account_id");
    router.push("/"); // go back to login
  };

  return (
    <Button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium shadow hover:bg-red-700 transition"
    >
      <LogOut className="w-4 h-4" />
      <span className="sm:flex hidden">Logout</span>
    </Button>
  );
}
