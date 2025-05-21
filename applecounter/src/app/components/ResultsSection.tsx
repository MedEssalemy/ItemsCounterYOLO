// app/components/ResultsSection.tsx
import React from 'react'
import { FiRepeat } from 'react-icons/fi'

type ResultsSectionProps = {
  result: {
    total_apples: number
  }
  onReset: () => void
}

export default function ResultsSection({
  result,
  onReset,
}: ResultsSectionProps) {
  return (
    <div className="card w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Analysis Complete</h2>
        <div className="bg-green-100 text-green-800 font-medium py-1 px-3 rounded-full text-sm">
          Success
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 px-4 mb-8 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="mb-4">
          <span className="text-5xl text-red-600">🍎</span>
        </div>
        <h3 className="text-xl font-bold text-center mb-2">Total Apples</h3>
        <div className="text-6xl font-bold text-center text-red-600 mb-2">
          {result.total_apples || 0}
        </div>
        <p className="text-slate-500 text-center">
          Our AI detected this many apples in your video
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="btn flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
        >
          <FiRepeat size={18} />
          <span>Analyze Another Video</span>
        </button>
      </div>
    </div>
  )
}
