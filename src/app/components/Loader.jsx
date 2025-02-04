import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-xl">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin glow-animation" />
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-lg"></div>
      </div>
    </div>
  )
}

export default Loader;
