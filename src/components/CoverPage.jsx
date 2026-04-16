import React from 'react'

function CoverPage({ onStartQuiz }) {
  return (
    <div className="relative z-10 px-8 py-14 md:py-18 animate-fadeIn">
      
      {/* 顶部折痕效果 */}
      <div className="fold-line absolute top-0 left-0 right-0 h-28 opacity-20 pointer-events-none"></div>
      
      {/* 左侧折痕 */}
      <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-transparent via-[#8B2626]/8 to-transparent pointer-events-none"></div>
      
      {/* 装饰性顶部图案 */}
      <div className="flex justify-center mb-7">
        <div className="flex items-center space-x-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#8B2626]/40"></div>
          <div className="text-[#8B2626]/60 text-base">◆</div>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#8B2626]/40"></div>
        </div>
      </div>

      {/* 主标题 */}
      <h1 className="text-center text-2xl md:text-3xl font-bold text-[#2C2825] mb-5 leading-relaxed tracking-widest">
        國立中央大學
        <br />
        <span className="inline-block mt-2 px-4 py-1 border-t border-b border-[#8B2626]/30 text-lg">
          穿越性格测试
        </span>
      </h1>

      {/* 装饰分隔线 */}
      <div className="flex items-center justify-center my-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A39E93] to-transparent"></div>
        <div className="mx-3 text-[#8B2626]/50 text-sm">❖</div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#A39E93] to-transparent"></div>
      </div>

      {/* 副标题 */}
      <p className="text-center text-sm md:text-base text-[#2C2825]/80 leading-loose mb-10 tracking-wide text-justify px-2">
        若回到民国三十七年的金陵
        <br />
        你会成为哪一类青年？
      </p>

      {/* 年份装饰 */}
      <div className="text-center mb-10">
        <span className="inline-block px-5 py-1.5 border border-[#8B2626]/20 rounded-none text-[#8B2626]/60 text-xs tracking-widest bg-[#8B2626]/3">
          民国三十七年 · 公元一九四八
        </span>
      </div>

      {/* 启程按钮 */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={onStartQuiz}
          className="group relative px-9 py-3.5 bg-[#8B2626] text-white font-semibold text-base tracking-widest
                     transition-all duration-300 hover:bg-[#6b1e1e]
                     active:scale-[0.98] stamp-effect cursor-pointer rounded-none"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>【</span>
            <span>启程入学</span>
            <span>】</span>
          </span>
          
          {/* 按钮悬停效果 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* 底部装饰文字 */}
      <div className="mt-12 text-center">
        <p className="text-[11px] text-stone-400 tracking-[0.35em] leading-relaxed">
          NATIONAL CENTRAL UNIVERSITY
          <br />
          <span className="mt-1 inline-block">穿越性格测评系统</span>
        </p>
      </div>

      {/* 底部折痕效果 */}
      <div className="fold-line absolute bottom-0 left-0 right-0 h-20 opacity-15 pointer-events-none transform rotate-180"></div>
    </div>
  )
}

export default CoverPage