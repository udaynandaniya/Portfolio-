"use client";
import React, { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: Props) {
  // stop background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // ESC key close
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex flex-col">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-black text-white">
        <h2 className="font-semibold text-sm sm:text-lg">
          Uday Nandaniya — Resume
        </h2>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="/resume.pdf"
            download
            className="bg-orange-600 hover:bg-orange-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
          >
            Download
          </a>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full">
        <iframe
          src="/resume.pdf#zoom=page-width"
          className="w-full h-full"
          title="Resume"
        />
      </div>
    </div>
  );
}
