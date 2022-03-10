import React from 'react'

export default function Food({ cord }) {
  const style = { top: `${cord[1]}%`, left: `${cord[0]}%` }
  return <div className='food' style={style}></div>
}
