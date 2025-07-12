import React from 'react'
import './App.css'
import { Die } from './Die'

const App = () => {
  
  const [dice, newDice] = React.useState(generateAllNewDice())

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
        <div className="btn-container">
          {btns}
        </div>
        <button 
          onClick={handleClick}
          className='roll'
        >
          roll
        </button>
      </article>
    </section>
  )
}

export default App