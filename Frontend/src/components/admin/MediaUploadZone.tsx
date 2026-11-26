'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  X, 
  Link as LinkIcon, 
  Film, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Folder,
  FolderOpen,
  FileText
} from 'lucide-react';

interface MediaUploadZoneProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  mediaType?: 'image' | 'video' | 'any';
  placeholder?: string;
  allowUrlToggle?: boolean;
}

interface DiscoveredFile {
  file: File;
  name: string;
  path: string;
  previewUrl: string;
  type: 'image' | 'video' | 'other';
  sizeFormatted: string;
}

export default function MediaUploadZone({
  value,
  onChange,
  label,
  description,
  mediaType = 'any',
  placeholder = 'Drop image or video here, or browse from device/folder',
  allowUrlToggle = true
}: MediaUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState(value || '');
  
  // Folder browsing state
  const [discoveredFiles, setDiscoveredFiles] = useState<DiscoveredFile[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrlInputValue(value || '');
  }, [value]);

  // Clean up created object URLs on unmount or when discoveredFiles change
  useEffect(() => {
    return () => {
      discoveredFiles.forEach((df) => {
        try {
          URL.revokeObjectURL(df.previewUrl);
        } catch {}
      });
    };
  }, [discoveredFiles]);

  // Determine media type if possible
  const isVideo = (url: string) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      lower.includes('.mp4') ||
      lower.includes('.webm') ||
      lower.includes('.mov') ||
      lower.includes('.ogg') ||
      lower.includes('youtube.com') ||
      lower.includes('youtu.be') ||
      lower.startsWith('data:video')
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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isMatchingMediaType = (file: File): boolean => {
    const isImg = file.type.startsWith('image/') || /\.(png|jpe?g|webp|svg|gif|bmp|avif)$/i.test(file.name);
    const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov|ogg|m4v|avi)$/i.test(file.name);

    if (mediaType === 'image') return isImg;
    if (mediaType === 'video') return isVid;
    return isImg || isVid;
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

      try {
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
      } catch (apiErr) {
        // Local/static mode fallback
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
      const files = Array.from(e.dataTransfer.files).filter(isMatchingMediaType);
      if (files.length === 0) {
        setError(`No matching ${mediaType === 'any' ? 'media' : mediaType} files found in drop.`);
        return;
      }
      if (files.length === 1) {
        processFile(files[0]);
      } else {
        // Multiple files dropped: show picker list
        const discovered = files.map((file) => ({
          file,
          name: file.name,
          path: (file as any).webkitRelativePath || file.name,
          previewUrl: URL.createObjectURL(file),
          type: file.type.startsWith('video/') ? ('video' as const) : ('image' as const),
          sizeFormatted: formatFileSize(file.size)
        }));
        setDiscoveredFiles(discovered);
        setSelectedFolderName('Dropped Files');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const allFiles = Array.from(e.target.files);
      const matching = allFiles.filter(isMatchingMediaType);

      if (matching.length === 0) {
        setError(`No ${mediaType === 'any' ? 'image or video' : mediaType} files found in the selected folder.`);
        return;
      }

      // Determine folder name from webkitRelativePath
      const firstPath = (matching[0] as any).webkitRelativePath || '';
      const folderName = firstPath ? firstPath.split('/')[0] : 'Selected Folder';
      setSelectedFolderName(folderName);

      if (matching.length === 1) {
        processFile(matching[0]);
        setDiscoveredFiles([]);
      } else {
        const discovered = matching.map((file) => ({
          file,
          name: file.name,
          path: (file as any).webkitRelativePath || file.name,
          previewUrl: URL.createObjectURL(file),
          type: file.type.startsWith('video/') ? ('video' as const) : ('image' as const),
          sizeFormatted: formatFileSize(file.size)
        }));
        setDiscoveredFiles(discovered);
      }
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInputValue('');
    setDiscoveredFiles([]);
    setSelectedFolderName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
  };

  const handleApplyUrl = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
    }
  };

  const acceptMime =
    mediaType === 'image'
      ? 'image/*'
      : mediaType === 'video'
      ? 'video/*'
      : 'image/*,video/*';

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
            className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Switch to Drag & Drop / Folder' : 'Enter Web / Video URL'}</span>
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
            placeholder="https://... or /uploads/... or YouTube link"
            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 font-mono focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      ) : (
        <div>
          {/* Hidden File Input for Single File Browse */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={acceptMime}
            className="hidden"
          />

          {/* Hidden File Input for Whole Folder Selection */}
          <input
            type="file"
            ref={folderInputRef}
            onChange={handleFolderChange}
            accept={acceptMime}
            {...({ webkitdirectory: '', directory: '', multiple: true } as any)}
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
                  title="Replace with single file"
                  className="bg-black/70 hover:bg-black text-white px-2 py-1.5 rounded-lg text-xs backdrop-blur-sm transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Change File</span>
                </button>
                <button
                  type="button"
                  onClick={() => folderInputRef.current?.click()}
                  title="Choose from a folder"
                  className="bg-blue-600/80 hover:bg-blue-600 text-white px-2 py-1.5 rounded-lg text-xs backdrop-blur-sm transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Folder</span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  title="Remove file"
                  className="bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-lg text-xs backdrop-blur-sm transition-colors cursor-pointer"
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
              className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
                  : 'border-gray-300 hover:border-blue-400 bg-gray-50/50 hover:bg-white'
              }`}
            >
              {isUploading ? (
                <div className="py-4 flex flex-col items-center justify-center space-y-2">
                  <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-blue-600 font-medium">Processing &amp; optimizing media file...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
                    {mediaType === 'video' ? <Film className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Drag &amp; Drop {mediaType === 'video' ? 'Video' : mediaType === 'image' ? 'Image' : 'Media'} File Here
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      or choose one of the options below
                    </p>
                  </div>

                  {/* Dual Action Buttons: Select File vs Select from Folder */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>Browse File</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => folderInputRef.current?.click()}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Select from Folder</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-400 font-light">
                    Supports PNG, JPG, WebP, SVG, MP4, WebM (Auto-saved)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Folder Content Selection Drawer (If user picked a folder with multiple assets) */}
          {discoveredFiles.length > 0 && (
            <div className="mt-3 bg-white border border-blue-200 rounded-2xl p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Folder className="w-4 h-4" />
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">
                      Folder: {selectedFolderName || 'Selected Folder'}
                    </h5>
                    <p className="text-[10px] text-gray-500 font-light">
                      Found {discoveredFiles.length} {mediaType === 'any' ? 'media' : mediaType} items. Click any file to apply it:
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDiscoveredFiles([])}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  title="Close folder view"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto no-scrollbar p-1">
                {discoveredFiles.map((df, dfIdx) => (
                  <div
                    key={dfIdx}
                    onClick={() => {
                      processFile(df.file);
                      setDiscoveredFiles([]);
                    }}
                    className="group bg-[#f8f9fc] hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-xl p-2 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="relative w-full h-16 bg-white rounded-lg overflow-hidden border border-gray-100 mb-1 flex items-center justify-center">
                      {df.type === 'video' ? (
                        <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-blue-600">
                          <Film className="w-6 h-6" />
                          <span className="text-[9px] font-mono mt-0.5">VIDEO</span>
                        </div>
                      ) : (
                        <Image
                          src={df.previewUrl}
                          alt={df.name}
                          fill
                          className="object-contain p-1"
                          unoptimized
                        />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-gray-800 group-hover:text-blue-700 block truncate" title={df.name}>
                        {df.name}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono block">
                        {df.sizeFormatted}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
