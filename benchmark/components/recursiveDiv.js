import React from 'react'

const RecursiveDiv = ({length, width}) => {
  if (length <= 0) return <span>I am a leaf. </span>

  let children = []
  for (let i = 0; i < width; i++) {
    children.push(<RecursiveDiv key={i} length={length-1} width={width}/>)
  }
  return <div>{children}</div>
}

export default RecursiveDiv
