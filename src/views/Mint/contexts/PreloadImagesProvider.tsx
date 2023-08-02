import { memo, createContext, useEffect, useMemo, useReducer, useState } from 'react'


export const PreloadImagesContext = createContext({ images: [] })

const PreloadImagesProvider: React.FC = ({ children }) => {

  const imageUrls = [
  	'./images/raid/attributes/1.png',
  	'./images/raid/attributes/2.png',
  	'./images/raid/attributes/3.png',
  	'./images/raid/attributes/4.png',
  	'./images/raid/attributes/5.png',

  	'./images/raid/races/1.png',
  	'./images/raid/races/2.png',
  	'./images/raid/races/3.png',
  	'./images/raid/races/4.png',
  	'./images/raid/races/5.png',

  	'./images/raid/numbers/0.png',
  	'./images/raid/numbers/1.png',
  	'./images/raid/numbers/2.png',
  	'./images/raid/numbers/3.png',
  	'./images/raid/numbers/4.png',
  	'./images/raid/numbers/5.png',
  	'./images/raid/numbers/6.png',
  	'./images/raid/numbers/7.png',
  	'./images/raid/numbers/8.png',
  	'./images/raid/numbers/9.png',

  	'./images/raid/levels/1.png',
  	'./images/raid/levels/2.png',
  	'./images/raid/levels/3.png',
  	'./images/raid/levels/4.png',
  	'./images/raid/levels/5.png',

  	'./images/raid/dot_green.png',
  	'./images/raid/dot_gray.png'
  ]
  const [ images, setImages ] = useState<any>([])

  useEffect(() => {
  	const loadImages = async (srcs: string[]) => {
	  	const images = await Promise.all(
	  		srcs.map(async (src) => {
		  		const image = await new Promise((resolve, reject) => {
			  		const image = new Image()
			  		image.src = src
			  		if(image.complete) {
			  			resolve(image)	
			  		} else {
			  			const timer = setInterval(() => {
			  				if(image.complete) {
			  					resolve(image)
			  					clearInterval(timer)
			  				}
			  			}, 100)
			  		}
			  	})
			  	return image
		  	})
		  )
		  console.log("preloaded = ", images)
		  setImages(images)
	  }
	  loadImages(imageUrls)
  }, [])

  return <PreloadImagesContext.Provider value={{ images }}>{children}</PreloadImagesContext.Provider>
}

export default memo(PreloadImagesProvider)