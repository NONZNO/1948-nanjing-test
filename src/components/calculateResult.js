const schoolDatabase = {
  "东南大学": {
    key: "SEU",
    address: "南京市玄武区四牌楼2号",
    mbti: "ISTJ / INTJ",
    tag: "秩序的建造者",
    catchphrase: "图纸未干，山河待筑。你在四牌楼的晨光里，丈量着一个时代的建立。",
    avatar: "/seu_avatar.png",
    bondItem: "一把刻着你名字的德国产黄铜计算尺"
  },
  "南京大学": {
    key: "NJU",
    address: "南京市鼓楼区汉口路22号",
    mbti: "INTP / INFJ",
    tag: "真理的追问者",
    catchphrase: "宇宙寂静，我只在鼓楼的旧窗下推演人间公理。",
    avatar: "/nju_avatar.png",
    bondItem: "一本写满批注的《天演论》残卷"
  },
  "南京师范大学": {
    key: "NNU",
    address: "南京市鼓楼区宁海路122号",
    mbti: "ENFJ / ISFJ",
    tag: "温润的守望者",
    catchphrase: "人心未定，灯火不熄。在随园的一盏灯下，守护人心的温度。",
    avatar: "/nnu_avatar.png",
    bondItem: "一枚随园秋风吹落的银杏书签"
  },
  "河海大学": {
    key: "HHU",
    address: "南京市鼓楼区西康路1号",
    mbti: "ISTP / ISFJ",
    tag: "江河的驯服者",
    catchphrase: "江河未治，脚步先行。水流之处，即是你的方向。",
    avatar: "/hhu_avatar.png",
    bondItem: "一本沾着黄河泥沙的《水道提纲》"
  },
  "南京农业大学": {
    key: "NAU",
    address: "南京市玄武区卫岗1号",
    mbti: "ESFJ / ESTP",
    tag: "大地的耕耘者",
    catchphrase: "沃野千里，粒粒皆辛苦。你在卫岗的试验田里，守护着苍生的饭碗。",
    avatar: "/nau_avatar.png",
    bondItem: "一捧来自卫岗试验田的饱满麦穗"
  },
  "南京林业大学": {
    key: "NFU",
    address: "南京市玄武区龙蟠路159号",
    mbti: "ENFP / INFP",
    tag: "生命的守望者",
    catchphrase: "十年树木，百年树人。你在紫金山的林海中，聆听万物生长的声音。",
    avatar: "/nfu_avatar.png",
    bondItem: "一枚钟山脚下拾得的干瘪松果"
  },
  "南京工业大学": {
    key: "NJTECH",
    address: "南京市浦口区江浦街道",
    mbti: "ESTJ / ENTP",
    tag: "实干的革新者",
    catchphrase: "炉火正旺，百炼成钢。你在丁家桥的烟囱下，锻造着工业强国的脊梁。",
    avatar: "/njtech_avatar.png",
    bondItem: "一个耐高温的复古玻璃反应烧瓶"
  },
  "南京信息工程大学": {
    key: "NUIST",
    address: "南京市浦口区盘城新街",
    mbti: "ISFP / ENTJ",
    tag: "风云的洞察者",
    catchphrase: "风云变幻，洞若观火。你在盘城的气象台前，解读着天地的密码。",
    avatar: "/nuist_avatar.png",
    bondItem: "一架黄铜打造的复古风速仪"
  }
}

/**
 * 【核心修复Bug-A】计算MBTI维度得分
 * 
 * 数据流确认：
 * - QuizPage.handleOptionClick: updatedAnswers[currentQuestionIndex] = option.scores
 *   → userAnswers 数组元素格式为: {N:1, P:1} 或 {T:1, J:1} 等
 *   → answer 本身就是 scores 对象，不需要 answer.scores！
 * 
 * @param {Array} answers - userAnswers数组，每个元素是 {E:1} 或 {N:1,P:1} 等得分对象
 * @returns {{ mbti: string, scores: {E,I,S,N,T,F,J,P} }}
 */
function calculateMBTI(answers) {
  // 初始化8个MBTI维度得分容器
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  // 【关键修复】遍历每个答题记录，直接累加维度得分
  // answer 格式示例: {N:1, P:1} 或 {T:1, J:1} 或 {E:1}
  // 不再错误地访问 answer.scores！
  answers.forEach((answer) => {
    if (answer && typeof answer === 'object') {
      Object.entries(answer).forEach(([key, value]) => {
        // 只累加有效的MBTI维度键（E/I/S/N/T/F/J/P）
        if (scores.hasOwnProperty(key) && typeof value === 'number') {
          scores[key] += value
        }
      })
    }
  })

  // 根据各维度得分比较，确定最终MBTI类型字符串
  const mbti = [
    scores.E >= scores.I ? 'E' : 'I',  // 外向 vs 内向
    scores.S >= scores.N ? 'S' : 'N',  // 务实 vs 远见
    scores.T >= scores.F ? 'T' : 'F',  // 明理 vs 共情
    scores.J >= scores.P ? 'J' : 'P'   // 笃行 vs 旷达
  ].join('')

  // 【Debug探针】打印真实得分数据，供开发者验证
  console.log("🔥 进度条接收到的真实MBTI得分数据: ", JSON.stringify(scores))
  console.log("🔥 计算得出的MBTI类型: ", mbti)

  return { mbti, scores }
}

/**
 * 根据MBTI类型匹配最适合的学校
 * 使用简化算法：直接通过最终MBTI类型匹配学校数据库
 * 
 * @param {Array} answers - 答题记录数组（此处未使用，保留接口兼容）
 * @param {string} mbti - 计算得出的MBTI类型
 * @returns {{ schoolName, schoolKey, scores }}
 */
function calculateSchool(answers, mbti) {
  // 直接用MBTI类型匹配学校
  // 优先精确匹配，备选按首字母匹配
  const mbtiKey = mbti.split('').join('')

  // 计算各学校的MBTI匹配度
  const schoolMatchScores = {}
  Object.entries(schoolDatabase).forEach(([schoolName, schoolInfo]) => {
    const schoolMBTIs = schoolInfo.mbti.split('/').map(s => s.trim())
    let matchScore = 0
    
    schoolMBTIs.forEach(schoolMBTI => {
      // 计算MBTI相似度
      for (let i = 0; i < 4; i++) {
        if (mbti[i] === schoolMBTI[i]) {
          matchScore++
        }
      }
    })
    
    schoolMatchScores[schoolName] = matchScore
  })

  // 找出最高匹配分的学校
  const maxScore = Math.max(...Object.values(schoolMatchScores))
  const topSchools = Object.keys(schoolMatchScores).filter(
    name => schoolMatchScores[name] === maxScore
  )

  // 平分时随机选取
  const selectedSchool = topSchools.length > 1
    ? topSchools[Math.floor(Math.random() * topSchools.length)]
    : topSchools[0]

  const selectedInfo = schoolDatabase[selectedSchool]

  console.log("🔥 学校匹配得分: ", JSON.stringify(schoolMatchScores))
  console.log("🔥 匹配学校: ", selectedSchool, " | MBTI: ", selectedInfo.mbti)

  return {
    schoolName: selectedSchool,
    schoolKey: selectedInfo.key,
    scores: schoolMatchScores
  }
}

/**
 * 主入口：整合MBTI计算与学校匹配
 * 
 * @param {Array} answers - QuizPage传递的userAnswers数组
 * @returns {{ mbti, scores, schoolName, schoolKey, schoolInfo }}
 */
function calculateResult(answers) {
  // 验证数据格式
  console.log("📨 calculateResult 收到答题记录数量: ", answers.length)
  console.log("📨 第一条答题记录示例: ", JSON.stringify(answers[0]))

  // 计算MBTI（包含Debug探针）
  const mbtiResult = calculateMBTI(answers)
  
  // 计算匹配学校（传入mbti用于匹配）
  const schoolResult = calculateSchool(answers, mbtiResult.mbti)
  
  // 构建完整学校信息对象
  const schoolInfo = {
    ...schoolDatabase[schoolResult.schoolName],
    schoolName: schoolResult.schoolName
  }

  return {
    mbti: mbtiResult.mbti,
    scores: mbtiResult.scores,       // ← 关键！传递8维原始得分给ResultPage
    schoolName: schoolResult.schoolName,
    schoolKey: schoolResult.schoolKey,
    schoolInfo: schoolInfo
  }
}

export { schoolDatabase, calculateMBTI, calculateSchool, calculateResult }
export default calculateResult