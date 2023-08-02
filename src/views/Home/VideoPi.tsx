import { InjectedModalProps, ModalContainer, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
// import "./styles.css";

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;

  border-radius: 0px;
  // background-image: url('/images/raid/swap/bg-mint-modal.png'); // 873 x 666
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  padding: 0;
  border: none;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 1200px;
  }

  max-width: 100%;
  max-height: 100%;

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`

interface ModalProps extends InjectedModalProps {}

const VideoPi: React.FC<ModalProps> = ({ onDismiss }) => {
  // const dispatch = useAppDispatch()
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  // const swiper = useSwiper()
  // console.log("swiper=", swiper)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
  }

  const isMinted = true

  const [playEnded, setPlayEnded] = useState(false)
  const onPlayEnd = () => {
    setPlayEnded(true)
  }

  return (
    <StyledModalContainer minWidth={isMobile ? '90%' : '582px'}>
      {!playing && (
        <div className="play-button" onClick={handlePlay}>
          <i className="fa fa-play fa-3x" />
        </div>
      )}
      <ReactPlayer
        playing={playing}
        controls={true}
        width="100%"
        height="100%"
        url="/images/raidx/home/sky.mp4"
        onEnded={onPlayEnd}
      />
    </StyledModalContainer>
  )
}

export default VideoPi
