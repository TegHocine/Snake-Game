import React from 'react'

export default function Snake({ position }) {
  const style = { top: `${position[1]}%`, left: `${position[0]}%` }
  return (
    <>
      <div className='snake' style={style}></div>
    </>
  )
}
