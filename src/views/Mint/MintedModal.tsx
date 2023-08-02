import BigNumber from 'bignumber.js'
import { useCallback, useState, useEffect, useContext } from 'react'
import { useAppDispatch } from 'state'
import {
  Button,
  Flex,
  Heading,
  InjectedModalProps,
  Modal,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  Text,
  Grid,
  Image as UIImage,
  Skeleton,
  appearAnimation,
  useMatchBreakpoints
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import useCatchTxError from 'hooks/useCatchTxError'
import { Animal, NftOrder } from 'state/types'
import styled from 'styled-components'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { RAID_HERO_IMAGE_BASE_URL } from 'config'
import ReactPlayer from 'react-player'
import { useSwiper, Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Navigation, Pagination } from "swiper";


import ComposedImage from './components/ComposedImage'
import { useFetchTraits } from './hooks'

const CanvasWrapper = styled.div`
  width: 220px;
  height: 352px;
`

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  height: 444px;
  border-radius: 0px;
  background-image: url('/images/raid/swap/bg-mint-modal.png'); // 873 x 666
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  padding: 0;
  border: none;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 582px;
    height: 444px;
  }
`
const StyledSwiper = styled(Swiper)`
  width: 220px;
  height: 332px;
  // opacity: 0.3;
  // animation: ${appearAnimation} 0.3s ease-in-out 0.5s forwards;
`
interface ModalProps extends InjectedModalProps {
  tokenIds: (number | undefined) []
}

const MintedModal: React.FC<ModalProps> = ({ onDismiss, tokenIds, ...props }) => {
  // const dispatch = useAppDispatch()
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  const traits = useFetchTraits(tokenIds)
  console.log("traits=", traits, tokenIds)
  // const swiper = useSwiper()
  // console.log("swiper=", swiper)

  const isMinted = tokenIds.length > 0 && traits.length > 0 

  const isValid = tokenIds.filter(id=>!!id).length > 0
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
          return await new Promise((resolve, reject) => {
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
        })
      )
      setImages(images)
    }
    loadImages(imageUrls)
  }, [])

  const [ playEnded, setPlayEnded ] = useState(false)
  const onPlayEnd = () => {
    setPlayEnded(true)
  }

  return (
    <StyledModalContainer minWidth={isMobile ? "90%" : "582px"}>
      <ModalCloseButton onDismiss={onDismiss} />
      <ModalBody>
        <Flex maxWidth="810px" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {
          !isMinted && <Skeleton width="220px" height="332px" />
        }
        {
          isMinted && !playEnded &&
          <ReactPlayer 
            width="220px"
            height="332px"
            playing
            url='/images/raid/swap/mint-video.mp4' 
            onEnded={onPlayEnd}
          />
        }
        {
          playEnded && 
          <StyledSwiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {
              traits.length > 0 ? traits.map(trait => (
                <SwiperSlide>
                  <ComposedImage images={images} trait={trait} key={`token_${trait.id}`} />
                </SwiperSlide>
              )) :
              <SwiperSlide>
                <Skeleton width="220px" height="332px" />
              </SwiperSlide>
            }
          </StyledSwiper>
        }
        </Flex>
      </ModalBody>
    </StyledModalContainer>
  )
}

export default MintedModal
