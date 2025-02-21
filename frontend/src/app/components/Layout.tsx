"use client";

import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  LogOut,
} from "lucide-react";
import useAuth from "@/utils/hooks/useAuth";
import Link from "next/link";
import Button from "./Button";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const { isLoading, logout } = useAuth();

  const navItems = [
    {
      title: "Scooters",
      icon: <CloudLightning size={20} />,
      path: "/scooters",
    },
    {
      title: "Pièces",
      icon: <Settings size={20} />,
      path: "/parts",
    },
    {
      title: "Clients",
      icon: <Users size={20} />,
      path: "/clients",
    },
  ];

  if (isLoading) return null;

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      <aside
        className={`${
          collapsed ? "w-20" : "w-56"
        } bg-gray-900 text-white fixed h-screen transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <CloudLightning className="text-teal-500" size={24} />
              <span className="font-medium">Volt</span>
            </div>
          )}
          {collapsed && (
            <CloudLightning className="mx-auto text-teal-500" size={24} />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-800"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-2 rounded-lg ${
                    pathname === item.path
                      ? "bg-teal-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <span className="text-teal-400">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-800 p-4">
          {collapsed ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              aria-label="Déconnexion"
            >
              <LogOut size={20} className="text-red-400" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={logout}
              leftIcon={<LogOut size={20} />}
              fullWidth
              className="text-gray-300 hover:text-white"
            >
              Déconnexion
            </Button>
          )}
        </div>
      </aside>

      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-56"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
