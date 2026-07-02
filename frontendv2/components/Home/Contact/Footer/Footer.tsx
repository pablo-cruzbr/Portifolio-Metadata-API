"use client"
import React, { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

const EMAIL = "pablocruzdev@gmail.com"

const Footer = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#050709] border-t border-white/5 py-6 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-[90%] xl:w-[80%] mx-auto">
        <p className="text-white/40 text-sm">
          Pablo Cruz — Portfólio Pessoal
        </p>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm text-gray-300 hover:text-white group"
        >
          {copied ? (
            <>
              <FiCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Copiado!</span>
            </>
          ) : (
            <>
              <FiCopy className="w-4 h-4" />
              <span>{EMAIL}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Footer
