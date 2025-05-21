// lib/api.ts
export async function submitVideo(file: File) {
  try {
    const formData = new FormData()
    formData.append('video', file)

    const response = await fetch(
      'https://itemscounter.ticktick.cloud/submit_video/',
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return { job_id: data.job_id }
  } catch (error) {
    console.error('Error submitting video:', error)
    throw error
  }
}

export async function getJobStatus(jobId: string) {
  try {
    const response = await fetch(
      `https://itemscounter.ticktick.cloud/job_status/${jobId}`
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Map the API response to our app's expected format
    if (data.status === 'completed') {
      return {
        status: 'completed',
        progress: 100,
        result: {
          total_apples: data.result.apple_count,
        },
      }
    } else if (data.status === 'failed') {
      return {
        status: 'failed',
        error: data.error || 'Processing failed',
      }
    } else {
      return {
        status: 'processing',
        progress: data.progress || 0,
      }
    }
  } catch (error) {
    console.error('Error checking job status:', error)
    throw error
  }
}
