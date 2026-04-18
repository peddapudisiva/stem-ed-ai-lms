import React, { useRef, useState } from 'react';
import { UploadCloud, X, File as FileIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  className?: string;
}

export function FileUpload({ 
  onUpload, 
  accept, 
  multiple = false, 
  maxSizeMB = 10,
  className 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    const validFiles = Array.from(files).filter(file => file.size <= maxSizeMB * 1024 * 1024);
    
    if (multiple) {
      const newFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(newFiles);
      onUpload(newFiles);
    } else {
      setSelectedFiles([validFiles[0]]);
      onUpload([validFiles[0]]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onUpload(newFiles);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 transition-colors flex flex-col items-center justify-center text-center cursor-pointer",
          isDragging ? "border-blue bg-blue-50" : "border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloud className={cn("h-10 w-10 mb-4", isDragging ? "text-blue" : "text-slate-400")} />
        <p className="text-[14px] font-[500] text-primary mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-[12px] text-slate-500">
          SVG, PNG, JPG or PDF (max. {maxSizeMB}MB)
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-surface border rounded-md shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileIcon className="h-5 w-5 text-blue shrink-0" />
                <div className="truncate">
                  <p className="text-[14px] font-[500] text-primary truncate border-b-0 pb-0">{file.name}</p>
                  <p className="text-[12px] text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                className="p-1 text-slate-400 hover:text-red hover:bg-red-50 rounded-md transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
