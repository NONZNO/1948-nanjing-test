import React, { useState, useRef } from 'react'
import CoverPage from './components/CoverPage'
import QuizPage from './components/QuizPage'
import ResultPage from './components/ResultPage'
import LoadingPage from './components/LoadingPage'
import Prologue from './components/Prologue'
import BGMControl from './components/BGMControl'
import { calculateResult } from './utils/calculateResult'

function App() {
  const [currentPage, setCurrentPage] = useState('cover')
  const [testResult, setTestResult] = useState(null)
  const [quizKey, setQuizKey] = useState(0)
  const bgmRef = useRef(null)

  const handleStartQuiz = () => {
    setCurrentPage('prologue')
    
    if (bgmRef.current) {
      bgmRef.current.play()
    }
  }

  const handlePrologueComplete = () => {
    setQuizKey(prev => prev + 1)
    setCurrentPage('quiz')
  }

  const handleShowResult = (answers) => {
    const result = calculateResult(answers)
    console.log('计算结果:', result)
    setTestResult(result)
    setCurrentPage('loading')

    setTimeout(() => {
      setCurrentPage('result')
    }, 2500)
  }

  const handleRestart = () => {
    setTestResult(null)
    setQuizKey(prev => prev + 1)
    setCurrentPage('cover')
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center p-4 font-serif">
      <BGMControl ref={bgmRef} />
      
      <div className="w-full max-w-md bg-[#F8F3EC] paper-texture vintage-border relative overflow-hidden min-h-[700px] border border-[#A39E93]">
        
        {currentPage === 'cover' && (
          <CoverPage onStartQuiz={handleStartQuiz} />
        )}
        
        {currentPage === 'quiz' && (
          <QuizPage key={quizKey} onShowResult={handleShowResult} />
        )}

        {currentPage === 'loading' && (
          <LoadingPage />
        )}

        {currentPage === 'result' && testResult && (
          <ResultPage result={testResult} onRestart={handleRestart} />
        )}

        {/* 角落装饰 - 所有页面共享 */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[#8B2626]/20 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#8B2626]/20 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#8B2626]/20 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[#8B2626]/20 pointer-events-none"></div>
      </div>

      {/* 序章过渡 - 全屏覆盖 */}
      {currentPage === 'prologue' && (
        <Prologue onComplete={handlePrologueComplete} />
      )}
    </div>
  )
}

export default App
