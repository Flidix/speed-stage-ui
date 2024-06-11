"use client";
import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

type CopyableTextProps = {
  text: string;
  maxLength?: number;
};

const CopyableText: React.FC<CopyableTextProps> = ({ text, maxLength }) => {
  const [copied, setCopied] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="flex break-words mt-6 items-center">
      <blockquote
        onClick={toggleText}
        className={`h-[100%] text-xs text-white break-all w-full border flex items-center break-normal	 border-white p-3 rounded-l-xl italic cursor-pointer break-words overflow-hidden ${
          showFullText ? "" : "truncate"
        }`}
      >
        {maxLength && !showFullText
          ? text.substring(0, maxLength) + "..."
          : text}
      </blockquote>
      <button
        onClick={handleCopy}
        className="text-sm pl-3  pr-3 h-[42px] flex justify-center items-center bg-white border-r border-t border-b rounded-r border-white text-customBlack font-medium leading-none"
      >
        {copied ? <TiTick size={20} /> : <FaRegCopy size={20} />}
      </button>
    </div>
  );
};

export default CopyableText;
