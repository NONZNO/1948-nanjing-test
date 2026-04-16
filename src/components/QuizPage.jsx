import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { questionsData } from '../data/questionsData'

function QuizPage({ onShowResult }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  
  const currentQuestion = questionsData[currentQuestionIndex]
  const totalQuestions = questionsData.length

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return
    
    setSelectedOption(option.id)
    
    const updatedAnswers = [...userAnswers]
    updatedAnswers[currentQuestionIndex] = option.scores
    setUserAnswers(updatedAnswers)

    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
      } else {
        onShowResult(updatedAnswers.filter(a => a))
      }
    }, 400)
  }

  const handleGoBack = () => {
    if (currentQuestionIndex <= 0) return
    
    const updatedAnswers = [...userAnswers]
    updatedAnswers.pop()
    setUserAnswers(updatedAnswers)
    
    setCurrentQuestionIndex(prev => prev - 1)
    setSelectedOption(null)
  }

  return (
    <div className="relative z-10 animate-slideIn flex flex-col min-h-[calc(100vh-120px)]">
      
      {/* 顶部折痕 */}
      <div className="fold-line absolute top-0 left-0 right-0 h-24 opacity-20 pointer-events-none"></div>
      
      {/* 进度条区域 */}
      <div className="px-6 pt-6 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          {currentQuestionIndex > 0 && (
            <button 
              onClick={handleGoBack}
              className="text-xs text-stone-500 hover:text-stone-700 tracking-widest transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            >
              ← 翻阅上页
            </button>
          )}
          {!currentQuestionIndex > 0 && <span></span>}
          
          <ProgressBar 
            currentQuestion={currentQuestionIndex + 1} 
            totalQuestions={totalQuestions}
          />
        </div>
      </div>

      {/* 题目区域 - 民国信笺风格 */}
      <div className="px-6 mb-4 flex-shrink-0">
        <div 
          className="relative bg-white/50 rounded-sm p-5 border border-[#A39E93]"
        >
          {/* 信笺装饰线 */}
          <div className="absolute top-4 left-4 bottom-4 w-px bg-[#8B2626]/15"></div>
          
          {/* 题号标签 */}
          <div className="flex items-start mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#8B2626] text-white text-sm font-bold rounded-none mr-3 flex-shrink-0 tracking-wider">
              {currentQuestion.id}
            </span>
            <h2 className="text-base md:text-lg text-[#2C2825] leading-relaxed font-semibold tracking-wide flex-1 text-justify">
              {currentQuestion.text}
            </h2>
          </div>

          {/* 装饰性分隔 */}
          <div className="mt-3 pt-3 border-t border-dashed border-[#A39E93]/40">
            <p className="text-[10px] text-stone-400 tracking-widest text-center">
              请凭直觉选择最符合你心意的答案
            </p>
          </div>
        </div>
      </div>

      {/* 选项卡片区 - 可滚动区域 */}
      <div className="px-6 pb-8 space-y-2.5 flex-1 overflow-y-auto min-h-0 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`
              w-full text-left p-4 rounded-sm border transition-all duration-200 
              cursor-pointer group relative overflow-hidden ripple-effect
              ${selectedOption === option.id
                ? 'border-[#8B2626] bg-red-50/60 scale-[0.98] card-press-animation selected-pulse'
                : selectedOption !== null
                  ? 'border-[#A39E93]/30 bg-white/30 opacity-45 cursor-not-allowed'
                  : 'border-[#A39E93]/35 bg-white/55 hover:border-[#8B2626]/40 hover:bg-red-50/25 active:scale-[0.98]'
              }
            `}
          >
            {/* 选项标识 */}
            <div className="flex items-start">
              <span className={`
                inline-flex items-center justify-center w-7 h-7 rounded-none mr-3 flex-shrink-0 font-bold text-base transition-all duration-200 tracking-wider
                ${selectedOption === option.id
                  ? 'bg-[#8B2626] text-white'
                  : selectedOption !== null
                    ? 'bg-stone-200/60 text-stone-400'
                    : 'bg-stone-200/70 text-stone-600 group-hover:bg-[#8B2626]/15 group-hover:text-[#8B2626]'
                }
              `}>
                {option.id}
              </span>
              
              {/* 选项文字 */}
              <span className={`
                flex-1 leading-relaxed text-sm transition-colors duration-200 text-justify
                ${selectedOption === option.id 
                  ? 'text-[#2C2825] font-semibold' 
                  : 'text-[#2C2825]/80'
                }
              `}>
                {option.text}
              </span>

              {/* 选中指示器 */}
              {selectedOption === option.id && (
                <span className="ml-2 text-[#8B2626] text-base font-bold">✓</span>
              )}
            </div>

            {/* 悬停装饰线 */}
            <div className={`
              absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#8B2626]/25 to-transparent transition-all duration-200 pointer-events-none
              ${selectedOption === null && 'group-hover:w-3'}
            `}></div>
          </button>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="px-6 pb-5 flex-shrink-0">
        <p className="text-center text-[10px] text-stone-400 tracking-widest">
          第 {currentQuestionIndex + 1} 题，共 {totalQuestions} 题 · 选择后自动进入下一题
        </p>
      </div>

      {/* 底部折痕 */}
      <div className="fold-line absolute bottom-0 left-0 right-0 h-16 opacity-15 pointer-events-none transform rotate-180"></div>
    </div>
  )
}

export default QuizPage