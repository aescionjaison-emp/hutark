'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Link as LinkIcon, Film, Image as ImageIcon, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface MediaUploadZoneProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  mediaType?: 'image' | 'video' | 'any';
  placeholder?: string;
  allowUrlToggle?: boolean;
}

export default function MediaUploadZone({
  value,
  onChange,
  label,
  description,
  mediaType = 'any',
  placeholder = 'Drop image or video here, or click to browse',
  allowUrlToggle = true
}: MediaUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine media type if possible
  const isVideo = (url: string) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      lower.includes('.mp4') ||
      lower.includes('.webm') ||
      lower.includes('.mov') ||
      lower.includes('youtube.com') ||
      lower.includes('youtu.be')
    );
  };

  const isYouTube = (url: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      if (url.includes('embed/')) return url;
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube-nocookie.com/embed/${match[2]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  // Upload file to server or convert to base64 Data URL
  const processFile = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      // Create local preview immediately
      const previewUrl = URL.createObjectURL(file);
      onChange(previewUrl);

      // Attempt upload to server API
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
          setUrlInputValue(data.url);
          setIsUploading(false);
          return;
        }
      }

      // If server upload fails (e.g. offline or static mode), fallback to persistent Base64 Data URL
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        onChange(base64);
        setUrlInputValue(base64);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError('Failed to read file locally');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);

    } catch (err: any) {
      console.warn('Upload API fallback to DataURL:', err);
      // Fallback
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInputValue('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleApplyUrl = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
    }
  };

  return (
    <div className="space-y-2">
      {/* Label & Type Header */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-xs font-semibold text-gray-700 flex items-center space-x-1.5">
            {mediaType === 'video' ? (
              <Film className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span>{label}</span>
          </label>
        )}

        {allowUrlToggle && (
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Switch to Drag & Drop' : 'Enter Web / Video URL'}</span>
          </button>
        )}
      </div>

      {description && (
        <p className="text-[11px] text-gray-500 font-light">{description}</p>
      )}

      {/* Main Drag-and-Drop Area or Direct URL Input */}
      {showUrlInput ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            placeholder="https://... or /uploads/..."
            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 font-mono focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
      ) : (
        <div>
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={
              mediaType === 'image'
                ? 'image/*'
                : mediaType === 'video'
                ? 'video/*'
                : 'image/*,video/*'
            }
            className="hidden"
          />

          {/* If media is present, display preview */}
          {value ? (
            <div className="relative group border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
              {isVideo(value) ? (
                isYouTube(value) ? (
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={getYouTubeEmbedUrl(value)}
                      title="Video Preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-video bg-black">
                    <video
                      src={value}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                )
              ) : (
                <div className="relative w-full h-36 bg-gray-900/5 flex items-center justify-center overflow-hidden">
                  <Image
                    src={value}
                    alt="Media preview"
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
              )}

              {/* Overlay Actions */}
              <div className="absolute top-2 right-2 flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Replace file"
                  className="bg-black/70 hover:bg-black text-white p-1.5 rounded-lg text-xs backdrop-blur-sm transition-colors flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Replace</span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  title="Remove file"
                  className="bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-lg text-xs backdrop-blur-sm transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Status footer badge */}
              <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span className="truncate max-w-[200px] font-mono text-[10px]">
                  {value.startsWith('data:') ? 'Base64 Local Data' : value}
                </span>
                <span className="text-emerald-600 font-medium flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Ready</span>
                </span>
              </div>
            </div>
          ) : (
            /* Drag and Drop Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                  : 'border-gray-300 hover:border-blue-400 bg-gray-50/50 hover:bg-white'
              }`}
            >
              {isUploading ? (
                <div className="py-3 flex flex-col items-center justify-center space-y-2">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-blue-600 font-medium">Processing & uploading file...</p>
                </div>
              ) : (
                <div className="py-2 flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {placeholder}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Drag from File Manager or <span className="text-blue-600 underline font-medium">browse local files</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-light">
                    Supports PNG, JPG, WebP, SVG, MP4, WebM (Auto-saved)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
