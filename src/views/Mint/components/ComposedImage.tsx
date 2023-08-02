import React, { useRef, useEffect, useContext } from 'react'
import Canvas from './Canvas'

const ComposedImage = ({ trait, images }) => {
	
  const draw = async (ctx) => {
  	// const images = await loadImages(imageUrls)
  	const { id, race, attribute, life, level, active } = trait

  	ctx.drawImage(images[attribute - 1], 0, 0, 880, 1328)
  	// ctx.drawImage(images[attribute - 1], 0, 0, 880, 1328, 0, 0, 220, 332)
		ctx.drawImage(images[4 + race], 65, 1100, 233, 184)
		// ctx.drawImage(images[4 + race], 0, 0, 233, 184, 65 / 4, 1100 / 4, 233 / 4, 184 / 4)
		const idNums = id.toString().split('').map(n => parseInt(n))
		idNums.forEach((n, i) => {
			ctx.drawImage(images[10 + n], 75 + i * 28, 70, 48, 66)
		})

		ctx.drawImage(images[19 + level], 395, 1190, 427, 106)

		const nums = life.toString().split('').map(n => parseInt(n))
		nums.forEach((n, i) => {
			ctx.drawImage(images[10 + n], 705 + i * 24, 1121, 48, 66)
		})

		ctx.drawImage(images[active ? 25 : 26], 318, 1117, 29, 28)
  }

  return <Canvas draw={draw} width="880px" height="1328px" displayWidth="220px" displayHeight="332px" />
}

export default ComposedImage