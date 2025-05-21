'use client'
import React, { useState, useEffect } from 'react'
import { submitVideo, getJobStatus } from '../lib/api'
import AppHeader from './components/AppHeader'
import ProcessTracker from './components/ProcessTracker'
import UploadSection from './components/UploadSection'
import ProcessingSection from './components/ProcessingSection'
import ResultsSection from './components/ResultsSection'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'uploading' | 'processing' | 'completed' | 'failed'
  >('idle')
  const [progress, setProgress] = useState<number>(0)
  const [result, setResult] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Determine current step for the process tracker
  const currentStep =
    status === 'idle'
      ? 1
      : status === 'uploading'
      ? 1
      : status === 'processing'
      ? 2
      : status === 'completed'
      ? 3
      : 1

  // Polling for job status
  useEffect(() => {
    if (!jobId) return

    const interval = setInterval(async () => {
      try {
        const res = await getJobStatus(jobId)
        if (res.status === 'completed') {
          setResult(res.result)
          setStatus('completed')
          clearInterval(interval)
        } else if (res.status === 'failed') {
          setStatus('failed')
          setErrorMessage(res.error || 'Job failed.')
          clearInterval(interval)
        } else {
          setProgress(res.progress || 0)
          setStatus('processing')
        }
      } catch (err) {
        setStatus('failed')
        setErrorMessage('Error checking job status.')
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [jobId])

  const handleSubmit = async () => {
    if (!uploadedVideo) return

    try {
      setStatus('uploading')
      const res = await submitVideo(uploadedVideo)
      setJobId(res.job_id)
      setStatus('processing')
      setProgress(0)
      setResult(null)
      setErrorMessage('')
    } catch (error) {
      setStatus('failed')
      setErrorMessage('Failed to submit video.')
    }
  }

  const handleReset = () => {
    setUploadedVideo(null)
    setJobId(null)
    setStatus('idle')
    setProgress(0)
    setResult(null)
    setErrorMessage('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <AppHeader />

      <div className="page-container">
        <div className="w-full mb-12 mt-8">
          <ProcessTracker currentStep={currentStep} />
        </div>

        <div className="w-full space-y-8">
          <AnimatePresence mode="wait">
            {(status === 'idle' || status === 'uploading') && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <UploadSection
                  onUpload={(file) => setUploadedVideo(file)}
                  onSubmit={handleSubmit}
                  isUploading={status === 'uploading'}
                  videoFile={uploadedVideo}
                />
              </motion.div>
            )}

            {status === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ProcessingSection progress={progress} onCancel={handleReset} />
              </motion.div>
            )}

            {status === 'completed' && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ResultsSection result={result} onReset={handleReset} />
              </motion.div>
            )}

            {status === 'failed' && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <div className="card bg-red-50 border border-red-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-red-800 mb-2">
                        Error Occurred
                      </h3>
                      <p className="text-red-700 mb-4">{errorMessage}</p>
                      <button onClick={handleReset} className="btn btn-primary">
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}