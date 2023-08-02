import React from 'react'
import styled from 'styled-components'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from '../config/config'
import { PanelProps, PushedProps } from '../types'
import { url } from 'inspector'

interface Props extends PanelProps, PushedProps {
  showMenu: boolean
  isMobile: boolean
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  // background-color: ${({ theme }) => theme.nav.background};
  width: ${({ isPushed }) => (isPushed ? `${SIDEBAR_WIDTH_FULL}px` : `${SIDEBAR_WIDTH_FULL}px`)};
  height: 100%;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: ${({ isPushed }) => (isPushed ? '2px solid rgba(133, 133, 133, 0.1)' : 0)};
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? 'initial' : 'hidden')};
  transform: translate3d(0, 0, 0);
  ${({ isPushed }) => !isPushed && 'white-space: nowrap;'};

  ${({ theme }) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: 100%;
  }

  background: url('/images/raid/swap/memu.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.9;
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

const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu } = props
  return (
    <StyledPanel isPushed={isPushed} showMenu={showMenu}>
      <img style={{ marginTop: '30px' }} src="/images/raid/swap/site-logo.png" alt="Raid" />
      <PanelBody {...props} />
      {/*   <PlayButton href="https://wolftown.world" target="_blank">
        <img src="/images/play-button.png" width="160px" alt="Play" />
      </PlayButton> */}
      <PanelFooter {...props} />
    </StyledPanel>
  )
}

export default Panel
