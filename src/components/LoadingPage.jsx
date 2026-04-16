import React, { useEffect, useState } from 'react'

function LoadingPage() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    
    return () => clearInterval(interval)
  }, [])

  const loadingTexts = [
    '正在推演您的性格图谱',
    '正在匹配金陵学府档案',
    '正在生成录取通知书',
    '正在加盖中央大学印章'
  ]

  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length)
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-10 animate-fadeIn flex flex-col items-center justify-center min-h-[650px] px-6">
      
      {/* 顶部折痕 */}
      <div className="fold-line absolute top-0 left-0 right-0 h-20 opacity-15 pointer-events-none"></div>

      {/* 中央 loading 区域 */}
      <div className="text-center space-y-7">
        
        {/* 印章动画 */}
        <div className="flex justify-center">
          <div 
            className="w-20 h-20 rounded-none flex items-center justify-center"
            style={{
              border: '2.5px solid #8B2626',
              background: 'linear-gradient(135deg, rgba(139, 38, 38, 0.05) 0%, rgba(139, 38, 38, 0.08) 100%)',
              animation: 'stampIn 1.5s ease-out infinite'
            }}
          >
            <div className="text-center text-[#8B2626] relative z-10">
              <div className="text-[10px] font-bold tracking-wider leading-tight">中央大學</div>
              <div className="text-[9px] tracking-widest mt-0.5">檔案處</div>
            </div>
          </div>
        </div>

        {/* 加载文字 */}
        <div className="space-y-2.5">
          <p className="text-[#2C2825]/65 text-sm font-medium tracking-wide leading-relaxed">
            {loadingTexts[currentTextIndex]}{dots}
          </p>
          
          <p className="text-stone-400 text-xs tracking-widest">
            系统正在为您生成专属入学档案
          </p>
        </div>

        {/* 进度指示器 */}
        <div className="flex justify-center space-x-2 pt-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-none transition-all duration-300 ${
                i <= currentTextIndex 
                  ? 'bg-[#8B2626]' 
                  : 'bg-[#A39E93]/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 装饰性边框 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 pointer-events-none opacity-8">
        <div className="absolute inset-0 border border-[#8B2626]/25 rounded-none transform rotate-[12deg]"></div>
        <div className="absolute inset-4 border border-[#A39E93]/25 rounded-none transform -rotate-[6deg]"></div>
      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-[10px] text-stone-350 tracking-[0.35em]">
          民國三十七年 · 國立中央大學招生委員會
        </p>
      </div>

      {/* 底部折痕 */}
      <div className="fold-line absolute bottom-0 left-0 right-0 h-14 opacity-12 pointer-events-none transform rotate-180"></div>
    </div>
  )
}

export default LoadingPage