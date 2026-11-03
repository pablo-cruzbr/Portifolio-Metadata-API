"use client"
import React, { useEffect, useState } from 'react'
import { FaCode } from 'react-icons/fa'

// Shown on a full page load (not on client navigation, since the layout stays mounted).
// The bar creeps toward 90% while the page loads and jumps to 100% on window "load".
// If JavaScript never runs, the .loading-fallback CSS animation hides the overlay anyway.

const CREEP_TO = 90
const TICK_MS = 120
const MAX_WAIT_MS = 6000
// On a fast connection "load" fires almost at once; keep the bar on screen long enough to see it fill.
const MIN_VISIBLE_MS = 1200
const FADE_MS = 500

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [hiding, setHiding] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const creep = setInterval(() => {
      setProgress((p) => (p < CREEP_TO ? p + Math.max(1, (CREEP_TO - p) * 0.08) : p))
    }, TICK_MS)

    const startedAt = Date.now()
    let finished = false
    let waitTimer: ReturnType<typeof setTimeout>
    let fadeTimer: ReturnType<typeof setTimeout>
    let removeTimer: ReturnType<typeof setTimeout>
    const complete = () => {
      clearInterval(creep)
      setProgress(100)
      fadeTimer = setTimeout(() => setHiding(true), 250)
      removeTimer = setTimeout(() => setGone(true), 250 + FADE_MS)
    }
    const finish = () => {
      if (finished) return
      finished = true
      waitTimer = setTimeout(complete, Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt)))
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    // Never keep the visitor waiting on a slow image or script.
    const safety = setTimeout(finish, MAX_WAIT_MS)

    return () => {
      clearInterval(creep)
      clearTimeout(safety)
      clearTimeout(waitTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      window.removeEventListener('load', finish)
    }
  }, [])

  if (gone) return null

  const value = Math.round(progress)

  return (
    <div
      role="progressbar"
      aria-label="Carregando o portfólio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={`loading-fallback fixed inset-0 z-[200000] flex flex-col items-center justify-center bg-[#0C0D1F] transition-opacity duration-500 ${
        hiding ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),transparent_60%)]" aria-hidden="true" />

      <div className="relative flex flex-col items-center">
        <div className="loading-pulse flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(34,211,238,0.35)]">
          <FaCode className="h-7 w-7 text-black" />
        </div>
        <p className="mt-6 text-2xl font-bold text-white">
          Pablo <span className="text-cyan-300">Cruz</span>
        </p>
        <p className="mt-1 font-mono text-xs text-gray-500">{"// carregando portfólio"}</p>

        <div className="mt-8 h-1.5 w-64 max-w-[70vw] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-[width] duration-200 ease-out"
            style={{ width: `${value}%` }}
          />
        </div>
        <p className="mt-3 font-mono text-xs tabular-nums text-cyan-300">{value}%</p>
      </div>
    </div>
  )
}

export default LoadingScreen
