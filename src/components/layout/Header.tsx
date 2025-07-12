"use client";

import { useState, useEffect } from "react";
import { CgShapeTriangle } from "react-icons/cg";
import { FaTwitter, FaInstagram, FaBlog } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const snsLinks = [
    { name: "X (Twitter)", icon: FaTwitter, url: "#" },
    { name: "Instagram", icon: FaInstagram, url: "#" },
    { name: "ブログ", icon: FaBlog, url: "#" },
    { name: "note", icon: FaPen, url: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <CgShapeTriangle
              className="w-8 h-8 text-primary"
              aria-label="Studio Tama Logo"
            />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-inter">
              STUDIO TAMA
            </h1>
          </div>

          {/* SNS Links and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* SNS Links */}
            <nav className="hidden sm:flex items-center space-x-3">
              {snsLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={
                isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"
              }
            >
              {isDarkMode ? (
                <MdLightMode className="w-5 h-5 text-yellow-500" />
              ) : (
                <MdDarkMode className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
