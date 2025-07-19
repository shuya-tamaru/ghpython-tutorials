"use client";

import { useState } from "react";
import { FaInstagram, FaBlog, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";
import { HiOutlineStar } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { IoPricetagOutline } from 'react-icons/io5';
import { MdOutlineCalendarToday } from 'react-icons/md';

interface MobileDrawerProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  difficultyFilter: number | null;
  onDifficultyFilterChange: (difficulty: number | null) => void;
  dayFilter: number | null;
  onDayFilterChange: (day: number | null) => void;
  maxDay: number;
  isOpen: boolean;
  onClose: () => void;
  availableTags: string[];
  totalTutorialsCount: number;
}

export default function MobileDrawer({
  selectedTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyFilterChange,
  dayFilter,
  onDayFilterChange,
  maxDay,
  isOpen,
  onClose,
  availableTags,
  totalTutorialsCount,
}: MobileDrawerProps) {
  const handleTagClick = (tag: string) => {
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
        fixed right-0 top-0 h-full w-[80%] bg-white dark:bg-gray-900 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-4 h-full flex flex-col overflow-y-auto">
          {/* Header with SNS and Close */}
          <div className="flex items-center justify-between mb-6 pt-4">
            {/* SNS Links */}
            <div className="flex gap-1">
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
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 mb-4"></div>

          {/* Search */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <IoIosSearch className="w-6 h-6 text-red-500" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Search
              </h3>
            </div>
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Day Filter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MdOutlineCalendarToday className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Day
                </span>
              </div>
              {dayFilter !== null && (
                <button
                  onClick={() => onDayFilterChange(null)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                           px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max={maxDay}
                step="1"
                value={dayFilter || 0}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  onDayFilterChange(value === 0 ? null : value);
                }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                         slider:bg-blue-500 slider:h-2 slider:rounded-lg slider:cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((dayFilter || 0) / maxDay) * 100}%, #e5e7eb ${((dayFilter || 0) / maxDay) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>All</span>
                <span>Day {Math.ceil(maxDay * 0.25)}</span>
                <span>Day {Math.ceil(maxDay * 0.5)}</span>
                <span>Day {Math.ceil(maxDay * 0.75)}</span>
                <span>Day {maxDay}</span>
              </div>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <HiOutlineStar className="w-6 h-6 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Difficulty
                </span>
              </div>
              {difficultyFilter !== null && (
                <button
                  onClick={() => onDifficultyFilterChange(null)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                           px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="7"
                step="0.5"
                value={difficultyFilter || 0}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  onDifficultyFilterChange(value === 0 ? null : value);
                }}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                         slider:bg-secondary slider:h-2 slider:rounded-lg slider:cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, #3776AB 0%, #3776AB ${((difficultyFilter || 0) / 7) * 100}%, #e5e7eb ${((difficultyFilter || 0) / 7) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>All</span>
                <span>★1</span>
                <span>★2</span>
                <span>★3</span>
                <span>★4</span>
                <span>★5</span>
                <span>★6</span>
                <span>★7</span>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <IoPricetagOutline className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tags ({selectedTags.length}/{availableTags.length})
              </span>
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                         px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tags Grid */}
          <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
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
                    <span className="capitalize">#{tag}</span>
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
