import React, { useRef, useEffect } from 'react'

const Canvas = (props) => {
  const { draw, displayWidth, displayHeight, ...rest } = props
  const canvasRef = useRef(null)

  const { style } = rest
  
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.style.width = displayWidth
    canvas.style.height = displayHeight
    const context = canvas.getContext('2d')
    draw(context)
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas