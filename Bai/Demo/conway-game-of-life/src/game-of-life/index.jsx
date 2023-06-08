import React, { useState, useEffect } from 'react'
import './GameOfLife.css'
const numRows = 200
const numCols = 200

// 创建一个空白的二维数组
const createEmptyGrid = () => {
  const grid = []
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numCols).fill(false)
  }
  return grid
}

// 随机生成初始细胞状态
const createRandomGrid = () => {
  const grid = []
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numCols).fill(false).map(() => Math.random() < 0.3)
  }
  return grid
}

const GameOfLife = () => {
  const [grid, setGrid] = useState(() => createEmptyGrid())
  const [running, setRunning] = useState(false)

  // 演化规则
  const evolve = grid => {
    const newGrid = [...grid]
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const neighbors = countNeighbors(grid, row, col)
        if (grid[row][col]) {
          if (neighbors < 2 || neighbors > 3) {
            newGrid[row][col] = false
          }
        } else {
          if (neighbors === 3) {
            newGrid[row][col] = true
          }
        }
      }
    }
    return newGrid
  }

  // 计算邻居细胞数量
  const countNeighbors = (grid, row, col) => {
    let count = 0
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
    for (let i = 0; i < directions.length; i++) {
      const [dx, dy] = directions[i]
      const newRow = row + dx
      const newCol = col + dy
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        if (grid[newRow][newCol]) {
          count++
        }
      }
    }
    return count
  }

  // 演化细胞状态
  const evolveGrid = () => {
    setGrid(prevGrid => evolve(prevGrid))
  }

  // 启动/停止演化
  const toggleRunning = () => {
    setRunning(prevRunning => !prevRunning)
  }

  // 重置细胞状态,都设为死亡
  const resetGrid = () => {
    setGrid(createEmptyGrid())
  }

  // 随机生成初始细胞状态，有的死有的活
  const randomizeGrid = () => {
    setGrid(createRandomGrid())
  }

  // 使用定时器演化细胞状态
  useEffect(() => {
    let timer
    if (running) {
      timer = setInterval(evolveGrid, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [running])

  // 渲染细胞格
  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div
        key={rowIndex}
        className="row"
        style={{ gridArea: `${rowIndex + 1}/1/${rowIndex + 1}/${numCols + 1}` }}
      >
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell ? 'alive' : 'dead'}`}
            style={{ gridRow: rowIndex + 1, gridColumn: colIndex + 1 }}
            onClick={() => toggleCell(rowIndex, colIndex)}
          ></div>
        ))}
      </div>
    ))
  }

  // 切换单个细胞的状态
  const toggleCell = (row, col) => {
    const newGrid = [...grid]
    newGrid[row][col] = !newGrid[row][col]
    setGrid(newGrid)
  }

  return (
    <div className="game-container">
      <div className="controls">
        <button onClick={toggleRunning}>{running ? '停止' : '开始'}</button>
        <button onClick={evolveGrid}>演化一步</button>
        <button onClick={resetGrid}>重置死亡态</button>
        <button onClick={randomizeGrid}>随机生成初始化</button>
      </div>
      <div className="grid">{renderGrid()}</div>

      <div>
        康威生命游戏（Conway's Game of
        Life）是一个经典的细胞自动机模拟游戏，由数学家约翰·康威于1970年提出。它是一个零玩家游戏，玩家只需要在初始状态下设置一些活跃细胞（也称为细胞生命）的位置，然后观察细胞根据一定的规则进行自动演化。
        <p>游戏的规则如下：</p>
        <p>1. 每个细胞的状态只有两种：存活或死亡。</p>
        <p>
          2. 每个细胞周围有八个邻居细胞，包括水平、垂直和对角线方向上的细胞。
        </p>
        <p> 根据当前细胞及其周围细胞的状态，确定下一代细胞的状态。</p>
        <p>
          1.
          如果一个细胞是活的，并且它周围的活细胞数量少于2个或多于3个，那么它在下一代将死亡（模拟人口稀疏或过度拥挤）。
        </p>
        <p>
          2.
          如果一个细胞是活的，并且它周围有2个或3个活细胞，那么它在下一代仍然存活。
        </p>
        <p>
          3.
          如果一个细胞是死的，并且它周围有3个活细胞，那么它在下一代将变为活细胞（模拟繁殖）。
        </p>
        <p>4. 其他情况下，细胞的状态保持不变。</p>
        游戏的演化是基于初始状态的细胞布局和上述规则进行的。细胞的演化可以产生各种有趣的模式，包括静态结构、振荡器和飞船等。
        康威生命游戏是一个经典的模拟游戏，具有数学和计算机科学的背景。它在计算机图形学、模式识别、人工生命等领域都有广泛的应用，并被认为是细胞自动机的代表作之一。
      </div>
    </div>
  )
}

export default GameOfLife
