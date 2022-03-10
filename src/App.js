import React, { useState } from 'react'
import { useInterval } from './interval/useInterval'

import Snake from './snake/Snake'
import Food from './food/Food'

import './App.css'

const BORDER_SIZE = [400, 400]
const DIRECTIONS = {
  38: [0, -2], // up
  40: [0, 2], // down
  37: [-2, 0], // left
  39: [2, 0] // right
}
const min = 1
const max = 98

export default function App() {
  const [snake, setSnake] = useState([
    [30, 50],
    [32, 50]
  ])
  const [food, setFood] = useState([
    Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2,
    Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  ])
  const [dir, setDir] = useState([2, 0])
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const moveSnake = ({ keyCode }) => {
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])
  }

  const createFood = () =>
    food.map(
      (_a) => Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    )

  const checkCollision = (head, snk = snake) => {
    if (head[0] < 2 || head[0] >= 98 || head[1] < 2 || head[1] >= 98)
      return true
    snk.pop()
    for (const segment of snk) {
      if (head[0] === segment[0] && head[1] === segment[1]) return true
    }
    return false
  }

  const checkFoodCollision = (newSnake) => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = createFood()
      setFood(newFood)
      setScore(score + 1)
      return true
    }
    return false
  }

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
  }

  useInterval(() => gameLoop(), speed)

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake))
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
    snakeCopy.unshift(newSnakeHead)
    if (checkCollision(newSnakeHead)) endGame()
    if (!checkFoodCollision(snakeCopy)) snakeCopy.pop()
    setSnake(snakeCopy)
  }

  const startGame = () => {
    setSpeed(100)
    setGameOver(false)
    setSnake([
      [30, 50],
      [32, 50]
    ])
    setFood([
      Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2,
      Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    ])
    setScore(0)
    setDir([2, 0])
  }

  return (
    <div role='button' tabIndex='0' onKeyDown={(e) => moveSnake(e)}>
      <div
        className='border'
        style={{
          border: '1px solid gray',
          width: `${BORDER_SIZE[0]}px`,
          height: `${BORDER_SIZE[0]}px`
        }}>
        {snake.map((snake, i) => (
          <Snake key={i} position={snake} />
        ))}
        <Food cord={food} />
        {gameOver && (
          <div className='gameover'>
            <h2>Game Over</h2>
            <p>Score: {score}</p>
          </div>
        )}
      </div>

      <div className='start'>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  )
}
