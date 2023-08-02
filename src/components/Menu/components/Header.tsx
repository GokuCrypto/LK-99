import React from 'react'
import styled from 'styled-components'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from '../config/config'
import { PanelProps, PushedProps } from '../types'
import { url } from 'inspector'
import { useMatchBreakpoints, Image, Text } from '@pancakeswap/uikit'

interface Props extends PanelProps, PushedProps {
  showMenu: boolean
  isMobile: boolean
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 0;

  width: 100%;
  height: auto;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: ${({ isPushed }) => (isPushed ? '2px solid rgba(133, 133, 133, 0.1)' : 0)};
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? 'initial' : 'initial')};
  overflow-y: visible;
  transform: translate3d(0, 0, 0);
  ${({ isPushed }) => !isPushed && 'white-space: nowrap;'};

  ${({ theme }) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: 100%;
  }

  background: url('/images/raidx/home/head.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.9;
  padding-left: 20%;
`

const PlayButton = styled.a`
  text-align: center;
  margin-top: 10px;
  &:hover {
    opacity: 0.9;
  }
  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`

const LogoImage = styled(Image)<{ isPushed: boolean }>`
  position: fixed;
  left: 10px;
  top: 0px;
  z-index: 12;
`

const LogoText = styled(Text)<{ isPushed: boolean }>`
  position: fixed;
  left: 75px;
  top: 15px;
  z-index: 12;
`

const Header: React.FC<Props> = (props) => {
  const { isPushed, showMenu } = props
  const { isMobile } = useMatchBreakpoints()

  return (
    <>
      {/*    <LogoImage
        width={isMobile ? 60 : 60}
        height={isMobile ? 60 : 60}
        mt={10}
        src="/images/raidx/home/renmine.jpg"
        alt="Raid"
        isPushed={isPushed}
      /> */}
      <LogoText fontSize={'20px'} isPushed={isPushed} color={'#eaeaea'}>
        RENMINE
      </LogoText>
      <StyledPanel isPushed={isPushed} showMenu={showMenu}>
        {!isMobile && <PanelBody {...props} />}
        {/*   <PlayButton href="https://wolftown.world" target="_blank">
        <img src="/images/play-button.png" width="160px" alt="Play" />
      </PlayButton> */}
        <PanelFooter {...props} />
      </StyledPanel>
    </>
  )
}

export default Header
