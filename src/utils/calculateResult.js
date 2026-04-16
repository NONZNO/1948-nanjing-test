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

function calculateMBTI(answers) {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  answers.forEach((answer) => {
    if (answer && answer.scores) {
      Object.entries(answer.scores).forEach(([key, value]) => {
        if (scores.hasOwnProperty(key)) {
          scores[key] += value
        }
      })
    }
  })

  const mbti = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P'
  ].join('')

  return { mbti, scores }
}

function calculateSchool(answers) {
  const schoolScores = { NJU: 0, SEU: 0, NNU: 0, HHU: 0, NAU: 0, NFU: 0, NJTECH: 0, NUIST: 0 }

  answers.forEach((answer) => {
    if (answer && answer.scores) {
      Object.entries(answer.scores).forEach(([key, value]) => {
        if (schoolScores.hasOwnProperty(key)) {
          schoolScores[key] += value
        }
      })
    }
  })

  const maxScore = Math.max(...Object.values(schoolScores))
  const topSchools = Object.keys(schoolScores).filter(key => schoolScores[key] === maxScore)

  let selectedKey
  if (topSchools.length > 1) {
    selectedKey = topSchools[Math.floor(Math.random() * topSchools.length)]
  } else {
    selectedKey = topSchools[0]
  }

  return {
    schoolName: Object.keys(schoolDatabase).find(name => schoolDatabase[name].key === selectedKey),
    schoolKey: selectedKey,
    scores: schoolScores
  }
}

function calculateResult(answers) {
  const mbtiResult = calculateMBTI(answers)
  const schoolResult = calculateSchool(answers)
  
  const schoolInfo = schoolDatabase[schoolResult.schoolName]

  return {
    ...mbtiResult,
    schoolName: schoolResult.schoolName,
    schoolKey: schoolResult.schoolKey,
    schoolScores: schoolResult.scores,
    schoolInfo: {
      ...schoolInfo,
      schoolName: schoolResult.schoolName
    }
  }
}

export { schoolDatabase, calculateMBTI, calculateSchool, calculateResult }
export default calculateResult
