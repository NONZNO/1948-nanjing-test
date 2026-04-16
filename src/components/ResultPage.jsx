import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

function ResultPage({ result, onRestart }) {
  const { schoolInfo, mbti, scores } = result
  const cardRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [posterUrl, setPosterUrl] = useState(null)

  const getPercent = (a, b) => {
    const total = (a || 0) + (b || 0)
    return total === 0 ? 50 : Math.round((a / total) * 100)
  }

  const traits = [
    { left: "涉世", right: "自省", percent: getPercent(scores?.E, scores?.I) },
    { left: "务实", right: "远见", percent: getPercent(scores?.S, scores?.N) },
    { left: "明理", right: "共情", percent: getPercent(scores?.T, scores?.F) },
    { left: "笃行", right: "旷达", percent: getPercent(scores?.J, scores?.P) },
  ]

  const handleGenerateImage = async () => {
    if (!cardRef.current || isGenerating) return
    
    setIsGenerating(true)
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#F8F3EC',
        logging: false,
        width: cardRef.current.scrollWidth,
        height: cardRef.current.scrollHeight,
        windowWidth: cardRef.current.scrollWidth,
        windowHeight: cardRef.current.scrollHeight
      })
      
      setPosterUrl(canvas.toDataURL('image/png', 1.0))
    } catch (error) {
      console.error('生成证书失败:', error)
      alert('证书生成失败，请稍后重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleClosePoster = () => {
    setPosterUrl(null)
  }

  return (
    <div className="relative z-10 animate-fadeIn pb-4">
      
      {/* 顶部折痕 */}
      <div className="fold-line absolute top-0 left-0 right-0 h-20 opacity-15 pointer-events-none"></div>

      {/* 录取通知标题 */}
      <div className="px-6 pt-7 mb-5 text-center">
        <p className="text-[11px] text-[#8B2626]/60 tracking-[0.35em] mb-2 font-semibold">
          ★ 录取通知书 ★
        </p>
        <p className="text-xs text-[#2C2825]/55 tracking-wider leading-relaxed">
          经国立中央大学招生委员会审核
          <br />
          您已被正式录取为以下院校之学员
        </p>
      </div>

      {/* 民国学生证卡片 - 海报截图区域 */}
      <div className="px-6 mb-5">
        <div 
          id="id-card-poster"
          ref={cardRef}
          className="relative bg-stone-50/90 overflow-hidden border-double border-4 border-stone-400/50"
          style={{ background: '#FAF7F2' }}
        >
          
          {/* 防伪底纹水印 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] text-7xl font-bold -rotate-12 pointer-events-none select-none tracking-widest" style={{ fontFamily: "'Noto Serif SC', SimSun, serif" }}>
            國立中央大學
          </div>

          {/* 卡片顶部装饰条 */}
          <div className="h-1.5 bg-gradient-to-r from-[#8B2626]/70 via-[#8B2626] to-[#8B2626]/70 relative z-[1]"></div>
          
          {/* 页眉 */}
          <div className="text-center pt-5 pb-3 border-b border-[#A39E93]/40 relative z-[1]">
            <h1 
              className="text-xl font-bold text-[#2C2825] tracking-[0.35em] mb-1"
              style={{ fontFamily: "'Noto Serif SC', SimSun, serif" }}
            >
              國立中央大學 學生證
            </h1>
            <p className="text-[10px] text-[#2C2825]/40 tracking-widest">
              NATIONAL CENTRAL UNIVERSITY · STUDENT ID CARD
            </p>
          </div>

          {/* 双栏信息区 */}
          <div className="p-5 relative z-[1]">
            <div className="flex gap-5">
              
              {/* 左侧：动态头像 */}
              <div className="flex-shrink-0">
                <div 
                  className="w-24 h-32 bg-stone-200/80 border border-[#A39E93] relative overflow-hidden"
                >
                  {schoolInfo.avatar && schoolInfo.avatar !== 'YOUR_IMAGE_URL' ? (
                    <img 
                      src={schoolInfo.avatar} 
                      alt={schoolInfo.schoolName}
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'sepia(0.25) contrast(1.08) brightness(1.02) saturate(0.75)'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-20 text-[#A39E93]" fill="currentColor" viewBox="0 0 100 120">
                        <circle cx="50" cy="35" r="22" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M 20 95 Q 50 75 80 95 L 80 115 L 20 115 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-black/4 pointer-events-none"></div>
                  
                  {/* 边框装饰角 */}
                  <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-l border-t border-[#A39E93]/30"></div>
                  <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 border-r border-t border-[#A39E93]/30"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-l border-b border-[#A39E93]/30"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-r border-b border-[#A39E93]/30"></div>
                </div>
                
                <p className="text-center text-[10px] text-[#2C2825]/30 mt-1.5 tracking-widest">
                  貼照片處
                </p>
              </div>

              {/* 右侧：用户信息 */}
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
                  <span className="text-[#2C2825]/55 font-semibold tracking-wider">姓名</span>
                  <span className="text-[#2C2825] font-medium tracking-wide">林清和</span>
                  
                  <span className="text-[#2C2825]/55 font-semibold tracking-wider">學號</span>
                  <span className="text-[#2C2825]/75 tracking-wide">1948-0321</span>
                  
                  <span className="text-[#2C2825]/55 font-semibold tracking-wider">院校</span>
                  <span className="text-[#8B2626] font-semibold tracking-wide">{schoolInfo.schoolName}</span>
                  
                  <span className="text-[#2C2825]/55 font-semibold tracking-wider">校址</span>
                  <span className="text-[#2C2825]/65 text-[11px] leading-relaxed">{schoolInfo.address}</span>
                  
                  <span className="text-[#2C2825]/55 font-semibold tracking-wider">MBTI</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-[#A39E93]/20 rounded-none text-[11px] font-mono font-semibold text-[#2C2825]/85">
                    {mbti}
                  </span>
                  
                  <span className="text-[#2C2825]/55 font-semibold tracking-wider">類型</span>
                  <span className="text-[#8B2626]/70 italic">{schoolInfo.tag}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 金陵青年特质评估卷宗 */}
          <div className="mx-5 my-2.5 py-2.5 border-y border-[#A39E93]/35 relative z-[1]">
            <p className="text-[9px] text-stone-500 font-bold tracking-[0.4em] text-center mb-2.5">
              【 金陵青年特质评估卷宗 】
            </p>
            
            <div className="space-y-2">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-7 text-right text-[11px] font-serif text-stone-500 tracking-wide flex-shrink-0">
                    {trait.left}
                  </span>
                  
                  <div className="flex-1 h-1 bg-[#A39E93]/20 border border-[#A39E93]/30 rounded-none overflow-hidden relative">
                    <div 
                      className="h-full bg-[#8B2626]/70 rounded-none transition-all duration-700 ease-out relative"
                      style={{ width: `${trait.percent}%` }}
                    >
                      {trait.percent > 5 && trait.percent < 95 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#8B2626] rounded-none"></div>
                      )}
                    </div>
                    
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-stone-400/25"></div>
                  </div>
                  
                  <span className="w-7 text-left text-[11px] font-serif text-stone-500 tracking-wide flex-shrink-0">
                    {trait.right}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-[8px] text-stone-400 text-center mt-2 tracking-widest italic">
              — 民国三十七年 · 心理测量室制 —
            </p>
          </div>

          {/* 专属羁绊物 */}
          {schoolInfo.bondItem && (
            <div className="mx-5 my-3 py-2.5 border-y border-dashed border-[#8B2626]/15 relative z-[1]">
              <div className="flex items-center gap-2.5">
                <span className="text-[9px] text-[#8B2626]/50 font-bold tracking-[0.4em] flex-shrink-0">
                  【专属羁绊】
                </span>
                <span 
                  className="text-xs text-[#2C2825]/70 italic leading-relaxed tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
                >
                  {schoolInfo.bondItem}
                </span>
              </div>
            </div>
          )}

          {/* 判词区分隔线 */}
          <div className="mx-5 border-t border-dashed border-[#A39E93]/25 my-3 relative z-[1]"></div>

          {/* 底部判词区 */}
          <div className="px-5 pb-5 relative z-[1]">
            <div className="bg-[#8B2626]/3 p-3.5 text-center border border-[#8B2626]/8">
              <p className="text-[10px] text-[#2C2825]/35 tracking-[0.3em] mb-1.5">
                — 錄取判詞 —
              </p>
              <p 
                className="text-sm md:text-base text-[#2C2825] leading-loose italic font-medium tracking-wide text-justify px-1"
                style={{ fontFamily: "'Noto Serif SC', Georgia, serif" }}
              >
                "{schoolInfo.catchphrase}"
              </p>
            </div>
          </div>

          {/* 专属印章 */}
          <div 
            className="absolute bottom-7 right-7 w-16 h-16 rounded-none flex items-center justify-center opacity-65 transform rotate-[-12deg] z-[2]"
            style={{
              border: '2.5px solid #8B2626',
              background: 'linear-gradient(135deg, rgba(139, 38, 38, 0.06) 0%, rgba(139, 38, 38, 0.09) 100%)'
            }}
          >
            <div className="text-center text-[#8B2626] px-0.5 relative z-10">
              <div className="text-[9px] font-bold tracking-wider leading-tight">中央大學</div>
              <div className="text-[8px] tracking-widest mt-0.5">檔案處</div>
            </div>
          </div>

          {/* 卡片底部装饰 */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#A39E93]/20 to-transparent relative z-[1]"></div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="px-6 space-y-2.5">
        
        {/* 主按钮：生成入学证书 */}
        <button 
          onClick={handleGenerateImage}
          disabled={isGenerating}
          className={`w-full py-3.5 bg-[#8B2626] text-white font-semibold text-sm tracking-widest rounded-none
                     transition-all duration-300 hover:bg-[#6b1e1e]
                     active:scale-[0.98] cursor-pointer relative overflow-hidden group
                     ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}
        >
          <span className="relative z-10 flex items-center justify-center space-x-2">
            {isGenerating ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>正在生成证书</span>
              </>
            ) : (
              <>
                <span>【</span>
                <span>生成我的入学证书</span>
                <span>】</span>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* 次按钮：重新启程 */}
        <button 
          onClick={onRestart}
          className="w-full py-2.5 bg-transparent text-[#8B2626] font-medium text-xs tracking-widest rounded-none
                     border border-[#8B2626]/45 transition-all duration-300 
                     hover:bg-[#8B2626]/5 active:scale-[0.98] cursor-pointer"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>【</span>
            <span>重新启程</span>
            <span>】</span>
          </span>
        </button>

        {/* 底部提示文字 */}
        <p className="text-center text-[10px] text-stone-400 tracking-[0.35em] pt-1.5">
          民國三十七年 · 國立中央大學招生委員會
        </p>
      </div>

      {/* 底部折痕 */}
      <div className="fold-line absolute bottom-0 left-0 right-0 h-14 opacity-12 pointer-events-none transform rotate-180"></div>

      {/* 海报预览弹窗 */}
      {posterUrl && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 animate-fadeIn"
          onClick={handleClosePoster}
        >
          {/* 关闭按钮 */}
          <button 
            onClick={handleClosePoster}
            className="absolute top-3 right-3 w-9 h-9 rounded-none bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold hover:bg-white/25 transition-colors z-10 cursor-pointer"
          >
            ✕
          </button>

          {/* 海报图片容器 */}
          <div 
            className="relative w-[92%] max-w-md max-h-[85vh] overflow-auto border border-[#A39E93]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={posterUrl} 
              alt="国立中央大学入学证书" 
              className="w-full h-auto block"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* 闪烁提示文字 */}
          <p 
            className="mt-4 text-white/85 text-xs tracking-wider text-center px-6"
            style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
          >
            🌟 长按图片保存至手机相册，分享你的金陵往事
          </p>
        </div>
      )}
    </div>
  )
}

export default ResultPage