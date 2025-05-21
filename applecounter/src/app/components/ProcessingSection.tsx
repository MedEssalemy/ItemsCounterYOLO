// app/components/ProcessingSection.tsx
import React from 'react'

type ProcessingSectionProps = {
  progress: number
  onCancel: () => void
}

export default function ProcessingSection({
  progress,
  onCancel,
}: ProcessingSectionProps) {
  return (
    <div className="card w-full">
      <h2 className="text-2xl font-semibold mb-6">Processing Video</h2>

      <div className="mb-6">
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-slate-600">
          <span>Analyzing video</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <p>AI is detecting and counting apples in your video...</p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onCancel}
            className="btn bg-slate-200 text-slate-800 hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
