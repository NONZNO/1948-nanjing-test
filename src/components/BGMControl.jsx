import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

const BGMControl = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e))
        setIsPlaying(true)
      }
    }
  }))

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
      setIsPlaying(true)
    }
  }

  return (
    <>
      <audio 
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/bgm.mp3" type="audio/mpeg" />
      </audio>
      
      <button
        onClick={togglePlay}
        className="fixed top-3 right-3 z-50 w-10 h-10 rounded-none bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#A39E93]
                   transition-all duration-300 hover:border-[#8B2626]/50 active:scale-[0.96]
                   flex items-center justify-center group cursor-pointer"
        title={isPlaying ? "暂停音乐" : "播放音乐"}
      >
        <div className={`transition-transform duration-1000 ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <svg 
            className={`w-5 h-5 ${isPlaying ? 'text-[#8B2626]' : 'text-stone-500'} group-hover:text-[#8B2626] transition-colors`}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            {isPlaying ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            ) : (
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            )}
          </svg>
        </div>

        {/* 声波动画 - 播放时显示 */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-none border border-[#8B2626]/20 animate-ping opacity-50"></div>
        )}
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  )
})

BGMControl.displayName = 'BGMControl'

export default BGMControl