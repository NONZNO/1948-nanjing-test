import React, { useState, useEffect } from 'react'

function Prologue({ onComplete }) {
  const [visible, setVisible] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true)
    }, 100)

    const fadeTimer = setTimeout(() => {
      setFadingOut(true)
    }, 2800)

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3800)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{ transition: 'opacity 1s ease-out', opacity: fadingOut ? 0 : 1 }}
    >
      <div 
        className="max-w-[85%] text-center px-6"
        style={{ 
          opacity: visible ? 1 : 0, 
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fontFamily: "'Noto Serif SC', 'SimSun', 'STSong', Georgia, serif"
        }}
      >
        <p className="text-amber-100/80 text-xs tracking-[0.5em] mb-8 font-light">
          序 章 · 解 密
        </p>
        
        <p className="text-stone-200/90 text-base md:text-lg leading-loose tracking-wider font-light">
          公元一九四八年，金陵城秋意渐浓。
          <br />
          时局变幻，暗流涌动。
          <br />
          一份尘封多年的中央大学绝密档案，今日解密。
        </p>

        <p 
          className="mt-8 text-amber-200/70 text-sm leading-relaxed tracking-wide italic"
          style={{
            opacity: visible ? 0.7 : 0,
            transition: 'opacity 1s ease-out 0.8s'
          }}
        >
          翻开它，看看你在那个大时代里，究竟是谁……
        </p>

        <div className="mt-10 flex items-center justify-center space-x-2">
          <div 
            className="h-px w-12 bg-gradient-to-r from-transparent to-amber-200/30"
            style={{
              width: visible ? '48px' : '0',
              transition: 'width 1s ease-out 1.2s'
            }}
          ></div>
          <span 
            className="text-amber-300/50 text-xs tracking-widest"
            style={{
              opacity: visible ? 0.6 : 0,
              transition: 'opacity 0.8s ease-out 1.4s'
            }}
          >
            MCMXLVIII
          </span>
          <div 
            className="h-px w-12 bg-gradient-to-l from-transparent to-amber-200/30"
            style={{
              width: visible ? '48px' : '0',
              transition: 'width 1s ease-out 1.2s'
            }}
          ></div>
        </div>
      </div>

      {/* 胶片颗粒效果 */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
          mixBlendMode: 'overlay'
        }}
      ></div>

      {/* 暗角效果 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
        }}
      ></div>
    </div>
  )
}

export default Prologue