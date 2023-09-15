class Poker {
  deck = []
  constructor() {
    this.createDeck()
  }

  // 创建一副扑克牌
  createDeck() {
    const suits = ['Hearts♥', 'Diamonds♦', 'Clubs♣', 'Spades♠']
    const ranks = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
    ]
    for (let suit of suits) {
      for (let rank of ranks) {
        this.deck.push({ suit, rank })
      }
    }
  }
  // 洗牌
  shuffle() {
    const shuffledDeck = [...this.deck]
    let currentIndex = shuffledDeck.length
    let temporaryValue
    let randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = shuffledDeck[currentIndex]
      shuffledDeck[currentIndex] = shuffledDeck[randomIndex]
      shuffledDeck[randomIndex] = temporaryValue
    }

    this.deck = shuffledDeck
  }

  // 发牌
  dealCards(players, needCards = 52) {
    const deck = this.deck
    const hands = []
    let cardIndex = 0

    for (let i = 0; i < players; i++) {
      hands[i] = []
    }

    while (deck.length > 0) {
      for (let i = 0; i < players; i++) {
        if (hands[i].length < needCards && cardIndex < deck.length) {
          hands[i].push(deck[cardIndex])
          cardIndex++
        } else {
          return hands
        }
      }
    }
    return hands
  }

  // 打印手牌
  printHand(hand) {
    let handString = ''
    for (let card of hand) {
      handString += `${card.rank} of ${card.suit} `
    }
    console.log(handString)
  }
}

// 获取数字数组
const getHandNums = hand => {
  const handNums = hand
    .map(({ rank, suit }) => {
      return +rank
    })
    .sort((a, b) => a - b)

  return handNums
}

// 获取花色数组
const getHandSuit = hand => {
  const handSuits = hand.map(({ suit }) => suit)
  return handSuits
}

// 判断是否顺子
const isOrder = handNums => {
  for (let i = 1; i < handNums.length; i++) {
    if (handNums[i] === handNums[i - 1] + 1) {
      continue
    } else {
      return false
    }
  }

  return true
}

// 判断是否同花色
const isSameSuit = (handSuits = []) => {
  const temp = handSuits[0]
  return handSuits.every(item => item === temp)
}

// 判断是否同花顺
const isOrderAndSameSuit = (handNums, handSuits) => {
  return isSameSuit(handSuits) && isOrder(handNums)
}

// 判断是否豹子
const isSameNumber = handNums => {
  const targetNuber = handNums[0]
  return handNums.every(item => item === targetNuber)
}

// 判断是否对子
const isSameNumLimit = handNums => {
  const newNums = [...new Set(handNums)]
  return newNums.length > 1 && newNums.length < handNums.length
}

// 获取手牌
const getHands = () => {
  const myDeck = new Poker()
  myDeck.shuffle()
  const hands = myDeck.dealCards(3, 3)

  const newHands = hands.map(hand => {
    const handNums = getHandNums(hand)
    const handSuits = getHandSuit(hand)
    switch (true) {
      // 豹子
      case isSameNumber(handNums):
        return 1
      //  同花色
      case isSameSuit(handSuits):
        if (isOrder(handNums)) {
          //   同花顺
          return 110
        } else {
          //   普通同花色
          return 10
        }
      // 顺子
      case isOrder(handNums):
        return 100
      // 对子
      case isSameNumLimit(handNums):
        return 1000
      // 普通牌
      default:
        return 10000
    }
  })
  return newHands
}

// 实验统计
const getRandomChance = nums => {
  let a = 0, // 豹子
    b = 0, // 同花顺
    c = 0, // 同花色
    d = 0, // 顺子
    e = 0, // 对子
    f = 0 // 普通牌

  let i = 0
  while (i < nums) {
    const hands = getHands()
    hands.forEach(item => {
      switch (item) {
        case 1:
          //   豹子
          a++
          break
        case 110:
          b++
          //   同花顺
          break
        case 10:
          c++
          //   同花色
          break
        case 100:
          d++
          //   顺子
          break
        case 1000:
          e++
          //   对子
          break
        default:
          //   普通牌
          f++
          break
      }
    })
    i++
  }

  // 概率统计
  const counts = nums * 3
  return {
    counts,
    baozi: a,
    baoziChance: a / counts,
    tongHuaShun: b,
    tongHuaShunChance: b / counts,
    tongHua: c,
    tongHuaChance: c / counts,
    shunzi: d,
    shunziChance: d / counts,
    duizi: e,
    duiziChance: e / counts,
    putong: f,
    putongChance: f / counts,
  }
}

// 扎金花概率统计实验
console.log(
  '%c Line:245 🍓 getRandomChance(10)',
  'font-size:18px;color:#fca650;background:#ffdd4d',
  getRandomChance(1000000)
)
