import React, { useState, useEffect } from 'react'

const Countdown = () => {
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
      const remainingSeconds = Math.floor((midnight.getTime() - now.getTime()) / 1000)

      const hours = Math.floor(remainingSeconds / 3600)
      const minutes = Math.floor((remainingSeconds % 3600) / 60)
      const seconds = Math.floor(remainingSeconds % 60)

      setCountdown({ hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{ color: '#fff' }}>
        <span>{countdown.hours.toString().padStart(2, '0')}</span>:
        <span>{countdown.minutes.toString().padStart(2, '0')}</span>:
        <span>{countdown.seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  )
}

export default Countdown
