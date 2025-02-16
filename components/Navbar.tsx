"use client";

import Link from "next/link";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "./theme-provider";

export default function Navbar() {
  const { setTheme, theme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className=" font-bold">
          Painel de Gerenciamento de Jornada Eva
        </Link>

        <DropdownMenu>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={theme === "light"} onCheckedChange={handleClick} aria-label="Toggle dark mode" />
            <Moon className="h-4 w-4" />
          </div>
        </DropdownMenu>
      </div>
    </nav>
  );
}
