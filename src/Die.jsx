import React from 'react'

export const Die = (prop) => {
  return (
    <button 
      className= { prop.state ? 'held' : '' }
      onClick={() => prop.click(prop.id)}
    >
      {prop.value}
    </button>
  )
}
