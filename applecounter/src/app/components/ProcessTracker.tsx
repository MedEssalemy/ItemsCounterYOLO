// app/components/ProcessTracker.tsx
import React from 'react'

type ProcessTrackerProps = {
  currentStep: number
}

export default function ProcessTracker({ currentStep }: ProcessTrackerProps) {
  const steps = [
    { id: 1, name: 'Upload' },
    { id: 2, name: 'Processing' },
    { id: 3, name: 'Results' },
  ]

  return (
    <div className="w-full">
      <div className="flex justify-between relative mb-2">
        {/* Progress bar */}
        <div className="absolute top-4 h-1 bg-slate-200 w-full -z-10"></div>
        <div
          className="absolute top-4 h-1 bg-red-500 -z-10 transition-all duration-500"
          style={{ width: `${(currentStep - 1) * 50}%` }}
        ></div>

        {/* Step indicators */}
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`step-indicator ${
                step.id <= currentStep ? 'bg-red-500' : 'bg-slate-300'
              } transition-colors duration-300`}
            >
              {step.id < currentStep ? '✓' : step.id}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step.id <= currentStep ? 'text-red-600' : 'text-slate-500'
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
