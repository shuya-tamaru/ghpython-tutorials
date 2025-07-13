"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CgShapeTriangle } from "react-icons/cg";
import { FaInstagram, FaBlog, FaYoutube, FaHome } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";
import { GoSun } from "react-icons/go";
import { MdModeNight } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { useBodyBackground } from "@/hooks/useBodyBackground";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  // チュートリアル詳細ページかどうかを判定
  const isTutorialDetailPage =
    pathname?.startsWith("/tutorial/") && pathname !== "/tutorial";

  // body背景色を管理
  useBodyBackground(isDarkMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      // デフォルトはダークモード
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
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
    { name: "X (Twitter)", icon: FaXTwitter, url: "https://x.com/tama20013" },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://www.youtube.com/@studioTama",
    },
    { name: "ブログ", icon: FaBlog, url: "https://www.styublog.com/" },
    { name: "note", icon: FaPen, url: "https://note.com/tamaru_shuya" },
    {
      name: "GitHub",
      icon: VscGithubInverted,
      url: "https://github.com/shuya-tamaru",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/shuya_tamaru/",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {isTutorialDetailPage ? (
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-70 transition-opacity duration-200"
              >
                <CgShapeTriangle
                  className="w-9 h-9 text-primary"
                  aria-label="Studio Tama Logo"
                />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-system">
                  STUDIO TAMA
                </h1>
              </Link>
            ) : (
              <>
                <CgShapeTriangle
                  className="w-9 h-9 text-primary"
                  aria-label="Studio Tama Logo"
                />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-system">
                  STUDIO TAMA
                </h1>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* SNS Links */}
            <nav className="hidden md:flex items-center space-x-3">
              {snsLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity duration-200"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="メニューを開く"
            >
              <HiMenu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={
                isDarkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"
              }
            >
              {isDarkMode ? (
                <GoSun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <MdModeNight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Home Button - Only on tutorial detail pages */}
            {isTutorialDetailPage && (
              <Link
                href="/"
                className="hidden md:block p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="ホームに戻る"
              >
                <FaHome className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
