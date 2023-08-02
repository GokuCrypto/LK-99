import React, { useRef, useEffect, useContext } from 'react'
import Canvas from './Canvas'

const ComposedWarriorImage = ({ trait, images }) => {
  const draw = async (ctx) => {
  	const { id, race, attribute, life, level, active } = trait

  	// background
  	ctx.drawImage(images[(race - 1) * 5 + attribute - 1], 0, 0, 880, 1328)
		// ctx.drawImage(images[4 + race], 65, 1100, 233, 184)

		// tokenId
		const idNums = id.toString().split('').map(n => parseInt(n))
		idNums.forEach((n, i) => {
			ctx.drawImage(images[25 + n], 75 + i * 28, 70, 48, 66)
		})

		// power
		const powerNums = level.toString().split('').map(n => parseInt(n))
		powerNums.forEach((n, i) => {
			ctx.drawImage(images[25 + n], 710 + i * 28, 70, 48, 66)
		})
		// ctx.drawImage(images[19 + level], 395, 1190, 427, 106)

		// life
		const nums = life.toString().split('').map(n => parseInt(n))
		nums.forEach((n, i) => {
			ctx.drawImage(images[25 + n], 705 + i * 24, 1121 + 70, 48, 66)
		})

		ctx.drawImage(images[active ? 35 : 36], 303, 1117, 29, 28)
  }

  return <Canvas draw={draw} width="880px" height="1328px" displayWidth="220px" displayHeight="332px" />
}

export default ComposedWarriorImage