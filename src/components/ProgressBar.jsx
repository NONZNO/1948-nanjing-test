import React from 'react'

function ProgressBar({ currentQuestion = 1, totalQuestions = 15 }) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className="w-full">
      {/* 进度文字 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] text-stone-500 tracking-widest">
          第 {currentQuestion} 题
        </span>
        <span className="text-[11px] text-[#8B2626]/70 font-semibold tracking-wider">
          {currentQuestion} / {totalQuestions}
        </span>
      </div>

      {/* 进度条容器 - 复古风格 */}
      <div 
        className="relative h-1.5 bg-[#A39E93]/20 rounded-none overflow-hidden"
      >
        {/* 进度填充 */}
        <div 
          className="absolute top-0 left-0 h-full bg-[#8B2626]/80 rounded-none transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
        
        {/* 纸张纹理覆盖层 */}
        <div className="absolute inset-0 opacity-10 paper-texture pointer-events-none"></div>
      </div>
    </div>
  )
}

export default ProgressBar