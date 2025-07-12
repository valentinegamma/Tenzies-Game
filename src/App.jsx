import React from 'react'
import './App.css'
import { Die } from './Die'
import Confetti from 'react-confetti'

const App = () => {
  
  const [dice, newDice] = React.useState(() =>generateAllNewDice())

  const count = []
  dice.map(dice => {
    if (dice.isheld){
     count.push(dice.value)
    }
  })

  let gameWon = (count.length === 10 && count.every(val => val === count[0]))

  const focused =React.useRef(null)
  
  React.useEffect(() => {
    if (gameWon) {
      focused.current.focus()
    }
  }, [gameWon])


  console.log(dice)
  console.log(count)
  console.log(gameWon)
  
  function generateAllNewDice() {
    const value = []
    while (value.length < 10 ) {
      const randomNumber = Math.floor(Math.random()*6)
      value.push({
        value: randomNumber,
        isheld: false,
        id: value.length
      })
    }
    return value
  }

  function handleClick() {
    if (!gameWon) {
      rollDice()
    } else {
      newDice(() => generateAllNewDice())
    }
  }
  function rollDice() {
        newDice(prev => 
      prev.map(dice => 
        !dice.isheld ? 
          {
            ...dice,
            value: Math.floor(Math.random()*6)
          }
        : 
          dice
      )
    )
  }

  function holdDice(id) {
    newDice(prev => 
        prev.map(dice => 
          id === dice.id ? {
            ...dice,
            isheld:!dice.isheld
          }:dice
        )
      )
  }

  const btns = dice.map((value, index) => {
    return (
      <Die 
      key = {index}
      id = {value.id}
      click = {holdDice}
      value = {value.value}
      state = {value.isheld}
    />
    )
  })

  return (
    <section className='container'>
      <article className='child-container'>
        {gameWon && <Confetti
          width={650}
          height={650}
        />}
        <h1>Tenzies Game</h1>
        <p>Roll until all dice are the same. Click each die to freeze it as its current value between rolls</p>
        <div className="btn-container">
          {btns}
        </div>
        <button 
        ref={focused}
          onClick={handleClick}
          className='roll'
        >
          {gameWon ? 'New game' : 'Roll'}
        </button>
      </article>
    </section>
  )
}

export default App