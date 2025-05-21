// app/components/AppHeader.tsx
import React from 'react'

export default function AppHeader() {
  return (
    <div className="w-full text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-4">
        <span className="text-4xl">🍎</span>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text">
          Apple Counter
        </h1>
      </div>
      <p className="text-slate-600 max-w-md mx-auto">
        Upload a video of apples and our AI will count them for you. Perfect for
        orchard management and harvest estimation.
      </p>
    </div>
  )
}
