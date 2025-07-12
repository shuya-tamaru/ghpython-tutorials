"use client";

import { useState } from "react";
import { TUTORIAL_TAGS, TAG_COLORS, type TutorialTag } from "@/lib/tags";
import { FaInstagram, FaBlog, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";
import { HiOutlineStar } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { IoPricetagOutline } from 'react-icons/io5';

interface MobileDrawerProps {
  selectedTags: TutorialTag[];
  onTagToggle: (tag: TutorialTag) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  difficultyFilter: number | null;
  onDifficultyFilterChange: (difficulty: number | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  selectedTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyFilterChange,
  isOpen,
  onClose,
}: MobileDrawerProps) {
  const filteredTags = TUTORIAL_TAGS;

  const handleTagClick = (tag: TutorialTag) => {
    onTagToggle(tag);
  };

  const clearAllTags = () => {
    selectedTags.forEach((tag) => onTagToggle(tag));
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
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Drawer */}
      <aside
        className={`
        fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-end mb-6 pt-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* SNS Links */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              {snsLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {link.name.replace(" (Twitter)", "")}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

          {/* Search */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <IoIosSearch className="w-6 h-6 text-red-500" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                タイトル検索
              </h3>
            </div>
            <input
              type="text"
              placeholder="チュートリアルを検索..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary focus:border-transparent
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <HiOutlineStar className="w-6 h-6 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  難易度
                </span>
              </div>
              {difficultyFilter !== null && (
                <button
                  onClick={() => onDifficultyFilterChange(null)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                           px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  クリア
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() =>
                    onDifficultyFilterChange(
                      difficultyFilter === difficulty ? null : difficulty
                    )
                  }
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 
                    border border-transparent hover:scale-105 active:scale-95 flex items-center gap-1
                    ${
                      difficultyFilter === difficulty
                        ? "bg-secondary text-white shadow-md hover:bg-secondary/90"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }
                  `}
                >
                  <span>★{difficulty}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <IoPricetagOutline className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                タグ ({selectedTags.length}/{TUTORIAL_TAGS.length})
              </span>
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                         px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                クリア
              </button>
            )}
          </div>

          {/* Tags Grid */}
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 
                      border border-transparent hover:scale-105 active:scale-95
                      ${
                        isSelected
                          ? "bg-primary text-white shadow-md hover:bg-primary/90"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                      }
                    `}
                  >
                    <span className="capitalize">{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
