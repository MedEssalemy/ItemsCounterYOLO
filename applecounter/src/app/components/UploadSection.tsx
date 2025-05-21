// app/components/UploadSection.tsx
import React, { useRef, useState } from 'react'
import { FiUploadCloud, FiFile, FiCheckCircle, FiLoader } from 'react-icons/fi'

type UploadSectionProps = {
  onUpload: (file: File) => void
  onSubmit: () => void
  isUploading: boolean
  videoFile: File | null
}

export default function UploadSection({
  onUpload,
  onSubmit,
  isUploading,
  videoFile,
}: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('video/')) {
        onUpload(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0])
    }
  }

  return (
    <div className="card w-full">
      <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>

      {!videoFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-red-500 bg-red-50'
              : 'border-slate-300 hover:border-red-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center">
            <FiUploadCloud size={48} className="text-slate-400 mb-4" />
            <p className="mb-2 font-medium">
              Drag and drop your video here or click to browse
            </p>
            <p className="text-sm text-slate-500">
              Upload a video containing apples for the AI to count
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="h-12 w-12 bg-slate-200 rounded flex items-center justify-center mr-4">
              <FiFile size={24} className="text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">
                {videoFile.name}
              </p>
              <p className="text-sm text-slate-500">
                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <div className="ml-4">
              <FiCheckCircle size={24} className="text-green-500" />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="btn bg-slate-200 text-slate-800 hover:bg-slate-300"
              onClick={() => onUpload(null as any)}
              disabled={isUploading}
            >
              Change Video
            </button>

            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={onSubmit}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <FiLoader className="animate-spin" size={20} />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <span>Start Counting Apples</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
